import { useDispatch } from 'react-redux'

import React, { useState } from 'react'
import { Paper, Project } from '../../lib/types'
import { Model } from '../../lib/model'

export default (params: { cb: () => void, project_name: string }) => {
    const cb = params.cb
    const dispatch = useDispatch()
    const model = new Model<Paper, 'PAPER_MODEL'>('PAPER_MODEL', 'paper', dispatch)
    const [paperId, setPaperId] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!paperId.trim()) return
        const paper: Paper = { project_name: params.project_name, arxiv_id: paperId, title: '', abstract: '' }
        await model.create(paper)
        setPaperId('')
        cb()
    }

  return (
    <form onSubmit={handleSubmit}>
        <div className='input-group mb-3'>
            <div className='input-group-prepend'>
            <span className='input-group-text'>
                New Paper Arxiv ID
            </span>
            </div>
            <input
            type='text'
            className='form-control'
            value={paperId}
            onChange={(e) => setPaperId(e.target.value)}
            />
        </div>
        <button className="btn btn-primary" type="submit">
            Add
        </button>
    </form>
  )
}