import React from 'react'

const ColumnFilter = ({ column }) => {
    const { filterValue, setFilter } = column
    return (
        <span>
            <input value={filterValue || ''} onChange={(e) => setFilter(e.target.value)}
                className="form-control me-sm-2" type="text" placeholder="Search" />
        </span>
    )
}

export default ColumnFilter
