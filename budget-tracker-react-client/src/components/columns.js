import { isDisabled } from '@testing-library/user-event/dist/utils'

export const COLUMNS = [
    {
        Header: 'Value',
        accessor: 'value',
    },
    {
        Header: 'Note',
        accessor: 'note',
    },
    {
        Header: '',
        accessor: 'transactionId',
        disableSortBy: true,
        Cell: ({ cell }) => (
            <div className="btn-group" role="group">
                <button className="btn btn-primary me-1">Update {cell.row.values.transactionId}</button>
                <button className="btn btn-warning">Delete {cell.row.values.transactionId}</button>
            </div>
        ),
        Filter: isDisabled,
        disableFilters:true
    }
]
