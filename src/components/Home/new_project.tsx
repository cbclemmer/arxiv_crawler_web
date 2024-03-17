import React, { useState } from 'react'
import { Project } from '../../lib/types'
import { Collection } from '../../lib/collection'

export default (data: { collection: Collection<Project, 'PROJECT_LIST'> }) => {
    const collection = data.collection
    const [projectName, setProjectName] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!projectName.trim()) return
        const project = { id: 0, name: projectName }
        await collection.create(project)
        setProjectName('')
        await collection.getList()
    }

  return (
    <form onSubmit={handleSubmit}>
        <div className='input-group mb-3'>
            <div className='input-group-prepend'>
            <span className='input-group-text'>
                New Project Name
            </span>
            </div>
            <input
            type='text'
            className='form-control'
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            />
        </div>
        <button className="btn btn-primary" type="submit">
            Create
        </button>
    </form>
  )
}