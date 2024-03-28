import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { AppState, Paper } from '../../lib/types'

import { Model } from '../../lib/model'

import Accordian from './accordian'

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
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">
                        <Link to={`https://arxiv.org/abs/${paper?.arxiv_id}`}>
                            {paper?.title}
                        </Link>
                    </h5>
                    <h6>
                        {paper?.arxiv_id}
                    </h6>
                    <h6 className="card-subtitle mb-2 text-body-secondary">
                        <Link to={`https://arxiv.org/pdf/${paper?.arxiv_id}`}>
                            [PDF]
                        </Link>
                    </h6>
                    <h6>
                    <Link to={"https://scholar.google.com/scholar?hl=en&as_sdt=0%2C44&q="+ paper?.title + "&btnG="}>
                        Search on Google Scholar
                    </Link>
                    </h6>
                    <p className="card-text">
                        {paper?.abstract}
                    </p>
                </div>
            </div>
            <div>
                {paper?.references_error && 
                    <div>
                        <b>Error obtaining references:</b><br/>
                        {paper?.references_error}
                    </div>
                }
                {!paper?.references_error && 
                    <div>
                        {Accordian({ items: paper?.references || [] })}
                    </div>
                }
            </div>
        </div>}
        </div>
    )
}