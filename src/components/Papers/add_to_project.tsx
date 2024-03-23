import { useDispatch, useSelector } from 'react-redux'

import React from 'react'
import { AppState, Paper } from '../../lib/types'
import { Model } from '../../lib/model'

export default (params: { paper_id: string }) => {
    const paper_id = params.paper_id
    const projectName = useSelector((state: AppState) => state.projectModel.model?.name)
    const dispatch = useDispatch()
    
    const model = new Model<Paper, 'PAPER_MODEL'>('PAPER_MODEL', 'paper', dispatch)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const paper: Paper = { project_name: projectName, arxiv_id: paper_id, clean_id: '', title: '', abstract: '', references: [], references_error: undefined }
        await model.create(paper)
        alert('Added paper to project')
    }

  return (
    <form onSubmit={handleSubmit}>
        <button className="btn btn-primary" type="submit">
            Add to project
        </button>
    </form>
  )
}