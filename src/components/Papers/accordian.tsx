import { sortBy } from 'lodash'

import { Reference } from '../../lib/types'
import { Link } from 'react-router-dom'

export default (params: { items: Reference[], log: string }) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const items = sortBy(params.items.map((i: Reference) => ({
        ...i,
        dateFmt: !!i.date ? new Date(i.date) : null,
        month: !!i.date ? months[new Date(i.date).getMonth() - 1] : '',
        year: !!i.date ? new Date(i.date).getFullYear() : ''
    }) as Reference), (i: Reference) => !!i.dateFmt ? i.dateFmt.getTime() : Infinity)

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
        </div>
    )

    return (
        <div className="accordion" id="accordionExample">
            <div key={'ref_log'} className="accordion-item">
                <div className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#ref_log"} aria-expanded="true" aria-controls={'ref_log'}>
                        <h6>
                            Reference Parse Log
                        </h6>
                    </button>
                </div>
                <div id={'ref_log'} className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                    <div dangerouslySetInnerHTML={{ __html: params.log.split('\n').join('<br/>\n')}}></div>
                </div>
                </div>
            </div>
            {items.map((item: Reference) => 
            <div key={item.id} className="accordion-item">
                <div className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#" + item.id} aria-expanded="true" aria-controls={item.id}>
                        <h6>
                            <b>
                                {item.arxiv_id && 
                                <span>
                                    [{item.month} {item.year}]
                                </span>
                                }
                                {item.title}
                            </b><br/>
                            <small>
                                {item.author}
                            </small>
                        </h6>
                    </button>
                </div>
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