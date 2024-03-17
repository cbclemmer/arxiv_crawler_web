import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { AppState, Project } from '../../lib/types'
import { Collection } from '../../lib/collection'

import NewProject from '../Projects/new_project'

export default () => {
    const projects = useSelector((state: AppState) => state.projectList.items)
    const loading = useSelector((state: AppState) => state.projectList.loading)

    const dispatch = useDispatch()
    const collection = new Collection<Project, 'PROJECT_LIST'>('PROJECT_LIST', 'project', dispatch)
    useEffect(() => {
        collection.get()
    }, [])

    const createCallback = () => {
        collection.get()
    }

    return (
    <div>
        <h1>Projects</h1>
        <NewProject cb={createCallback}/>
        {loading && <div>Loading...</div>}
        {!loading && <div>
            {projects.map((project: Project) => (
            <div>
                <Link to={`/projects/show/${project.name}`}>{project.name}</Link>
            </div>
            ))}
        </div>}
    </div>
  )
}