import { useDispatch } from 'react-redux'

import React, { useState } from 'react'
import { Project } from '../../lib/types'
import { Model } from '../../lib/model'

export default (params: { cb: () => void }) => {
    const cb = params.cb
    const dispatch = useDispatch()
    const model = new Model<Project, 'PROJECT_MODEL'>('PROJECT_MODEL', 'project', dispatch)
    const [projectName, setProjectName] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!projectName.trim()) return
        const project: Project = { id: 0, name: projectName, papers: [] }
        await model.create(project)
        setProjectName('')
        cb()
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