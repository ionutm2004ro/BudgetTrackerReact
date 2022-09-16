import React, { useState } from "react";
import Constants from "./utilities/Constants"
import TransactionCreateForm from "./components/TransactionCreateForm"
import TransactionUpdateForm from "./components/TransactionUpdateForm"

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [showingCreateNewTransactionForm, setShowingCreateNewTransactionForm] = useState(false);
  const [transactionCurrentlyBeingUpdated, setTransactionCurrentlyBeingUpdated] = useState(null);

  function getTransactions() {
    const url = Constants.API_URL_GET_ALL_TRANSACTIONS;

    fetch(url, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(transactionsFromServer => {
        setTransactions(transactionsFromServer)
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }
  getTransactions();

  function deleteTransaction(transactionId) {
    const url = `${Constants.API_URL_DELETE_TRANSACTION_BY_ID}/${transactionId}`;

    fetch(url, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(responseFromServer => {
        console.log(responseFromServer);
        onTransactionDeleted(transactionId);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  return (
    <div className="container">
      <div className="row min-vh-100">
        <div className="col d-flex flex-column">
          {(showingCreateNewTransactionForm === false && transactionCurrentlyBeingUpdated === null) && (
            <div className="row mt-4">
              <div className="col-6"><h2 className="text-primary">Transaction Table</h2></div>
              <div className="col-6 text-end">
                <button onClick={() => setShowingCreateNewTransactionForm(true)} className="btn btn-primary btn-lg">Create new transaction</button>
              </div>
            </div>
          )}

          {(transactions.length > 0 && showingCreateNewTransactionForm === false && transactionCurrentlyBeingUpdated === null) && renderTransactionsTable()}

          {showingCreateNewTransactionForm && <TransactionCreateForm onTransactionCreated={onTransactionCreated} />}

          {transactionCurrentlyBeingUpdated !== null && <TransactionUpdateForm transaction={transactionCurrentlyBeingUpdated} onTransactionUpdated={onTransactionUpdated} />}

        </div>
      </div>
    </div>
  );

  function renderTransactionsTable() {
    return (
      <div className="table-responsive mt-4">
        <table className="table table-bordered border-dark">
          <thead>
            <tr>
              <th scope="col">Value</th>
              <th scope="col">Note</th>
              <th scope="col">CRUD Operations</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.transactionId}>
                <td>{transaction.value}</td>
                <td>{transaction.note}</td>
                <td>
                  <button onClick={() => setTransactionCurrentlyBeingUpdated(transaction)} className="btn btn-primary btn-lg mx-3 my-3">Update</button>
                  <button onClick={() => { if (window.confirm(`Are you sure you want to delete?`)) deleteTransaction(transaction.transactionId) }} className="btn btn-warning btn-lg">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  function onTransactionCreated(createdTransaction) {
    setShowingCreateNewTransactionForm(false);
    if (createdTransaction === null) {
      return;
    }

    //alert(`Transaction successfully created. After clicking OK, your new transaction of value "${createdTransaction.value}" will show up in the table below.`);

    getTransactions();
  }

  function onTransactionUpdated(updatedTransaction) {
    setTransactionCurrentlyBeingUpdated(null);

    if (updatedTransaction === null) {
      return;
    }
    let transactionsCopy = [...transactions];

    const index = transactionsCopy.findIndex((transactionsCopyTransaction, currentIndex) => {
      if (transactionsCopyTransaction.transactionId === updatedTransaction.transactionId) {
        return true;
      }
    });

    if (index !== -1) {
      transactionsCopy[index] = updatedTransaction;
    }

    setTransactions(transactionsCopy);
  }

  function onTransactionDeleted(deletedTransactionTransactionId) {
    let transactionsCopy = [...transactions];

    const index = transactionsCopy.findIndex((transactionsCopyTransaction, currentIndex) => {
      if (transactionsCopyTransaction.transactionId === deletedTransactionTransactionId) {
        return true;
      }
    });

    if (index !== -1) {
      transactionsCopy.splice(index, 1);
    }

    setTransactions(transactionsCopy);
  }
}
