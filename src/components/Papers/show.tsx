import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { AppState, Paper, Reference } from '../../lib/types'

import { Model } from '../../lib/model'

import AddToProject from './add_to_project'

export default () => {
    const { id } = useParams()
    if (!id) return (<div>Invalid ID</div>)
    const paper = useSelector((state: AppState) => state.paperModel.model)

    const loading = useSelector((state: AppState) => state.paperModel.loading)

    const dispatch = useDispatch()

    const model = new Model<Paper, 'PAPER_MODEL'>('PAPER_MODEL', 'paper', dispatch)
    useEffect(() => {
        model.get(id)
    }, [])

    if (!loading && !!paper?.arxiv_id && paper?.arxiv_id.replace('.', '') != id) {
        model.get(id)
    }

    return (
        <div>
        {loading && <div>Loading...</div>}
        {!loading && <div>
            <h3>
                <Link to={`https://arxiv.org/abs/${paper?.arxiv_id}`}>
                    {paper?.title}
                </Link>
            </h3>
            <p>
                <Link to={`https://arxiv.org/pdf/${paper?.arxiv_id}`}>
                    [PDF]
                </Link>
            </p>
            <small>
                {paper?.abstract}
            </small><br/><br/>
            <div>
                {paper?.references_error && 
                    <div>
                        <b>Error obtaining references:</b><br/>
                        {paper?.references_error}
                    </div>
                }
                {!paper?.references_error && paper?.references.map((ref: Reference) => (
                    <div key={ref.title} style={{ 'padding': '10px' }}>
                        <div>
                            {ref.arxiv_id &&
                                <div>
                                    ARXIV:
                                    <Link to={`/papers/show/${ref.arxiv_id.replace('.', '')}`}>
                                        {ref.title}
                                    </Link>
                                </div>
                            }
                            {!ref.arxiv_id && ref.url && 
                                <div>
                                    URL: 
                                    <Link to={ref.url}>
                                        {ref.title}
                                    </Link>
                                </div>
                            }
                            {!ref.arxiv_id && !ref.url && 
                            <div>
                                Scholar: 
                                <Link to={"https://scholar.google.com/scholar?hl=en&as_sdt=0%2C44&q="+ ref.title + "&btnG="}>
                                    {ref.title}
                                </Link>
                            </div>
                            }
                        </div>
                        <div>
                            {Object.keys(ref.data).map((key: string) => 
                                <div>
                                    <b>{key}:</b> {ref.data[key]}
                                </div>
                            )}
                        </div>
                        {ref.arxiv_id && <AddToProject paper_id={ref.arxiv_id} />}
                    </div>
                ))}
            </div>
        </div>}
        </div>
    )
}