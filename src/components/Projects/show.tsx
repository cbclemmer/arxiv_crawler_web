import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { AppState, Paper, Project } from '../../lib/types'

import { Model } from '../../lib/model'
import NewPaper from './new_paper'

export default () => {
    const { name } = useParams()
    if (!name) return (<div>Invalid ID</div>)
    localStorage.setItem('arxiv_crawler_current_project', name)
    const project = useSelector((state: AppState) => state.projectModel.model)
    const papers = useSelector((state: AppState) => state.projectModel.model?.papers || [])

    const loading = useSelector((state: AppState) => state.projectModel.loading)

    const dispatch = useDispatch()

    const model = new Model<Project, 'PROJECT_MODEL'>('PROJECT_MODEL', 'project', dispatch)
    useEffect(() => {
        model.get(name)
    }, [])

    const addPaperCb = () => {
        model.get(name)
    }

    const removePaper = (paper: Paper) => {
        if (!confirm('Are you sure you want to delete this paper?')) {
            return
        }
        (async () => {
            const paperModel = new Model<Paper, 'PAPER_MODEL'>('PAPER_MODEL', 'paper', dispatch)
            await paperModel.apiPost('delete', {
                arxiv_id: paper.arxiv_id,
                project_name: project?.name
            })
            model.get(project?.name)
            alert('Paper deleted')
        })()
    }

    return (
        <div>
        {loading && <div>Loading...</div>}
        {!loading && <div>
            <h1>{project?.name}</h1>
            <NewPaper cb={addPaperCb} project_name={name}/>
            <div style={ { marginTop: '15px' } }>
                {papers.map((paper: Paper) => (
                    <div key={paper.arxiv_id} style={ { marginBottom: '20px' } }>
                        <Link to={`/papers/show/${paper.clean_id}`}>
                            {paper.title}
                        </Link>
                        <span 
                            className="badge text-bg-danger" 
                            onClick={removePaper.bind(null, paper)}
                            style={ { cursor: 'pointer', marginLeft: '15px' }}
                        >
                            Delete
                        </span>
                    </div>
                ))}
            </div>
        </div>}
        </div>
    )
}