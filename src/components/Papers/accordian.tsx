import { useDispatch, useSelector } from 'react-redux'

import React, { ReactElement } from 'react'
import { AppState, Paper, Reference } from '../../lib/types'
import { Model } from '../../lib/model'
import { Link } from 'react-router-dom'
import AddToProject from './add_to_project'

export default (params: { items: Reference[] }) => {
    const items = params.items

    const getAccordianBody = (ref: Reference) => (
        <div key={ref.id} style={{ 'padding': '10px' }}>
            <div className='alert alert-light' role='alert'>
                {ref.arxiv_id &&
                    <div>
                        <Link to={`/papers/show/${ref.arxiv_id.replace('.', '')}`}>
                            {ref.title}
                        </Link> 
                        <br/> <span className="badge text-bg-secondary">ARXIV</span>
                    </div>
                }
                {!ref.arxiv_id && ref.url && 
                    <div>
                        <Link to={ref.url}>
                            {ref.title}
                        </Link>
                        <br/> <span className="badge text-bg-secondary">URL</span>
                    </div>
                }
                {!ref.arxiv_id && !ref.url && 
                <div>
                    <Link to={"https://scholar.google.com/scholar?hl=en&as_sdt=0%2C44&q="+ ref.title + "&btnG="}>
                        {ref.title}
                    </Link>
                    <br/> <span className="badge text-bg-secondary">SCHOLAR</span>
                </div>
                }
            </div>
            <table className="table table-striped">
                <tbody>
                {Object.keys(ref.data).map((key: string) => 
                    <tr>
                    <td><b>{key}</b></td>
                    <td>{ref.data[key]}</td>
                    </tr>
                )}
                </tbody>
            </table>
            {ref.arxiv_id && <AddToProject paper_id={ref.arxiv_id} />}
        </div>
    )

    return (
        <div className="accordion" id="accordionExample">
            {items.map((item: Reference) => 
            <div key={item.id} className="accordion-item">
                <h2 className="accordion-header">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#" + item.id} aria-expanded="true" aria-controls={item.id}>
                    <b>{item.title}</b>
                </button>
                </h2>
                <div id={item.id} className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                    {getAccordianBody(item)}
                </div>
                </div>
            </div>
            )}
        </div>
    )
}