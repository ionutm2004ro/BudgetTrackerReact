import React from 'react'

const GlobalFilter = ({ filter, setFilter }) => {
    return (
        <span>
            <input value={filter || ''} onChange={(e) => setFilter(e.target.value)} 
            className="form-control me-sm-2" type="text" placeholder="Global Search"/>
        </span>
    )
}

export default GlobalFilter
