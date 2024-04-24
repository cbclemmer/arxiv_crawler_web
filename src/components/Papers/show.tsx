import { some } from 'lodash'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { AppState, Paper, Project } from '../../lib/types'

import { Model } from '../../lib/model'

import Accordian from './accordian'

export default () => {
    const { id } = useParams()
    if (!id) return (<div>Invalid ID</div>)
    const [containsPaper, setContainsPaper] = useState(false)
    const currentProject = localStorage.getItem('arxiv_crawler_current_project')
    const project = useSelector((state: AppState) => state.projectModel.model)
    const paper = useSelector((state: AppState) => state.paperModel.model)

    const loading = useSelector((state: AppState) => state.paperModel.loading)
 
    const dispatch = useDispatch()

    const paperModel = new Model<Paper, 'PAPER_MODEL'>('PAPER_MODEL', 'paper', dispatch)
    const projectModel = new Model<Project, 'PROJECT_MODEL'>('PROJECT_MODEL', 'project', dispatch)

    useEffect(() => { (async () => {
        const retPaper = await paperModel.get(id)
        if (!!currentProject) {
            const retProject = await projectModel.get(currentProject)
            setContainsPaper(some(retProject.papers, (p: Paper) => p.arxiv_id == retPaper.arxiv_id))
        }
    })() }, [])

    if (!loading && !!paper?.arxiv_id && paper?.arxiv_id.replace('.', '') != id) {
        paperModel.get(id)
    }

    const reloadPaper = async () => {        
        if (!confirm('This will reprosess the paper\'s references, which can take some time. Are you sure you want to continue?')) {
            return
        }
        await paperModel.apiPost('reload', {
            arxiv_id: paper?.arxiv_id
        })
        alert('Paper references reloaded')
    }

    const addPaper = async () => {
        await paperModel.create({
            project_name: currentProject ?? '',
            arxiv_id: paper?.arxiv_id ?? '',
            clean_id: '', title: '', abstract: '', references: [], references_error: ''
        })
        setContainsPaper(true)
        alert('Added paper to project')
    }
    
    return (
        <div>
        {loading && <div>Loading...</div>}
        {!loading && <div>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">
                        <Link to={`https://arxiv.org/abs/${paper?.arxiv_id}`}>
                            {paper?.title}
                        </Link>
                    </h5>
                    <h6>
                        {paper?.arxiv_id}
                    </h6>
                    <h6 className="card-subtitle mb-2 text-body-secondary">
                        <Link to={`https://arxiv.org/pdf/${paper?.arxiv_id}`}>
                            [PDF]
                        </Link>
                    </h6>
                    <h6>
                    <Link to={"https://scholar.google.com/scholar?hl=en&as_sdt=0%2C44&q="+ paper?.title + "&btnG="}>
                        Search on Google Scholar
                    </Link>
                    </h6>
                    <p className="card-text">
                        {paper?.abstract}
                    </p>
                    <div>
                        {!containsPaper && <button className='btn btn-primary' onClick={addPaper} style={ { marginRight: '15px' } }>
                            Add to Project
                        </button>}

                        <button className='btn btn-danger' onClick={reloadPaper}>
                            Reload References
                        </button>

                    </div>
                </div>
            </div>
            <div>
                {paper?.references_error && 
                    <div>
                        <b>Error obtaining references:</b><br/>
                        {paper?.references_error}
                    </div>
                }
                {!paper?.references_error && 
                    <div>
                        {Accordian({ items: paper?.references || [] })}
                    </div>
                }
            </div>
        </div>}
        </div>
    )
}