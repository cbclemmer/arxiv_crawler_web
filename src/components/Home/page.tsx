import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { AppState, Project } from '../../lib/types'
import { Collection } from '../../lib/collection'

import NewProject from './new_project'

export default () => {
  const projects = useSelector((state: AppState) => state.projectList.items)
  const loading = useSelector((state: AppState) => state.projectList.loading)

  const dispatch = useDispatch()
  const collection = new Collection<Project, 'PROJECT_LIST'>('PROJECT_LIST', 'project', dispatch)
  useEffect(() => {
    collection.getList()
  }, [])

  return (
    <div>
      <h1>Projects</h1>
      <NewProject collection={collection}/>
      {loading && <div>Loading...</div>}
      {!loading && <div>
        {projects.map((project: Project, index: number) => (
          <div>
            <Link to={`/projects/show/${project.id}`}>{project.name}</Link>
          </div>
        ))}
      </div>}
    </div>
  )
}