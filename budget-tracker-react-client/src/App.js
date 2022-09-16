import React, { useState } from "react";
import Constants from "./utilities/Constants"

export default function App() {
  const [transactions, setTransactions] = useState([]);

  function getTransactions() {
    const url = Constants.GET_ALL_TRANSACTIONS;

    fetch(url, {
      method: 'GET', mode: 'cors'
    })
      .then(response => response.json())
      .then(transactionsFromServer => {
        console.log(transactionsFromServer);
        setTransactions(transactionsFromServer)
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <div className="container">
      <div className="row min-vh-100">
        <div className="col d-flex flex-column justify-content-center align-items-center">
          <div>
            <h1>Transaction Table</h1>

            <div className="mt-5">
              <button onClick={getTransactions} className="btn btn-dark btn-lg w-100">Get transactions from server</button>
              <button onClick={getTransactions} className="btn btn-secondary btn-lg w-100 mt-4">Create new transaction</button>
            </div>

          </div>

          {transactions.length > 0 && renderTransactionsTable()}
        </div>
      </div>
    </div>
  );

  function renderTransactionsTable() {
    return (
      <div className="table-responsive mt-5">
        <table className="table table-bordered border-dark">
          <thead>
            <tr>
              <th scope="col">TransactionId (PK)</th>
              <th scope="col">Value</th>
              <th scope="col">Note</th>
              <th scope="col">CRUD Operations</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.transactionId}>
                <th scope="row">{transaction.transactionId}</th>
                <td>{transaction.value}</td>
                <td>{transaction.note}</td>
                <td>
                  <button className="btn btn-dark btn-lg mx-3 my-3">Update</button>
                  <button className="btn btn-secondary btn-lg">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* <button onClick={() => setTransactions([])} className="btn btn-dark btn-lg w-100">Empty Transaction Array</button> */}
      </div>
    )
  }
}
