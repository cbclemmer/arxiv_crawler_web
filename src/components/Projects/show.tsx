import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { AppState, Paper, Project } from '../../lib/types'

import { Model } from '../../lib/model'
import NewPaper from './new_paper'

export default () => {
    const { name } = useParams()
    if (!name) return (<div>Invalid ID</div>)
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

    return (
        <div>
        {loading && <div>Loading...</div>}
        {!loading && <div>
            <h1>{project?.name}</h1>
            <NewPaper cb={addPaperCb} project_name={name}/>
            <div>
                {papers.map((paper: Paper) => (
                    <div key={paper.arxiv_id}>
                        <Link to={`/papers/show/${paper.clean_id}`}>
                            {paper.title}
                        </Link>
                    </div>
                ))}
            </div>
        </div>}
        </div>
    )
}