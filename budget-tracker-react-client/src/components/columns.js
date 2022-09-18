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
        Cell: (props) => {
            var rowId = props.cell.row.values.transactionId;
            return (
            <div className="btn-group" role="group">
                <button onClick={() => {props.setTransactionCurrentlyBeingUpdated(props.cell.row.values)}}
                className="btn btn-primary me-1">Update</button>

                <button onClick={() => {props.deleteTransaction(rowId)}}
                className="btn btn-warning">Delete</button>
            </div>
        )},
        disableFilters:true,
        disableGlobalFilter: true
    }
]
