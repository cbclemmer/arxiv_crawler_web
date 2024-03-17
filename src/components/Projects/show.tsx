import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { AppState, Paper, Project } from '../../lib/types'

import { Model } from '../../lib/model'

export default () => {
    const { id } = useParams()
    if (!id || isNaN(parseInt(id))) return (<div>Invalid ID</div>)
    const numId = parseInt(id)
    const project = useSelector((state: AppState) => state.projectModel.model)

    const loading = useSelector((state: AppState) => state.projectModel.loading)

    const dispatch = useDispatch()

    const model = new Model<Project, 'PROJECT_MODEL'>('PROJECT_MODEL', 'project', dispatch)
    useEffect(() => {
        model.get(numId)
    }, [])

    return (
        <div>
        {loading && <div>Loading...</div>}
        {!loading && <div>
            <h1>{project?.name}</h1>
            {project?.papers.map((paper: Paper) => (
                <div>{paper.title}</div>
            ))}
        </div>}
        </div>
    )
}