import React, { useState } from "react";
import Constants from "./utilities/Constants"
import TransactionCreateForm from "./components/TransactionCreateForm"
import TransactionUpdateForm from "./components/TransactionUpdateForm"
import TransactionTable from "./components/TransactionTable";
export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [showingCreateNewTransactionForm, setShowingCreateNewTransactionForm] = useState(false);
  const [transactionCurrentlyBeingUpdated, setTransactionCurrentlyBeingUpdated] = useState(false);
  const [reloadData, setReloadData] = useState(true);

  function getTransactions() {
    const url = Constants.API_URL_GET_ALL_TRANSACTIONS;

    fetch(url, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(transactionsFromServer => {
        setTransactions(transactionsFromServer);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  function deleteTransaction(transactionId) {
    if (window.confirm(`Are you sure you want to delete?`)) {
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
  }

  return (
    <div className="container">
      <div className="row min-vh-100">
        <div className="col d-flex flex-column">
          {(showingCreateNewTransactionForm === false && transactionCurrentlyBeingUpdated === false) && (
            <div className="row mt-4">
              <div className="col-6"><h2 className="text-primary">Transaction Table</h2></div>
              <div className="col-6 text-end">
                <button onClick={() => setShowingCreateNewTransactionForm(true)} className="btn btn-primary btn-lg">Create new transaction</button>
              </div>
            </div>
          )}

          {(showingCreateNewTransactionForm === false && transactionCurrentlyBeingUpdated === false) && renderTransactionsTable()}

          {showingCreateNewTransactionForm && <TransactionCreateForm onTransactionCreated={onTransactionCreated} />}

          {transactionCurrentlyBeingUpdated !== false && <TransactionUpdateForm transaction={transactionCurrentlyBeingUpdated} onTransactionUpdated={onTransactionUpdated} />}

        </div>
      </div>
    </div>
  );

  function renderTransactionsTable() {
    if (reloadData) {
      setReloadData(false);
      getTransactions();
    }
    return (
      <div className="table-responsive mt-4">
        <TransactionTable data={transactions} 
        setTransactionCurrentlyBeingUpdated={setTransactionCurrentlyBeingUpdated}
        deleteTransaction={deleteTransaction} />
      </div>
    )
  }

  function onTransactionCreated(createdTransaction) {
    setShowingCreateNewTransactionForm(false);
    if (createdTransaction === null) {
      return;
    }

    alert(`Transaction successfully created. After clicking OK, your new transaction of value "${createdTransaction.value}" will show up in the table below.`);

    setReloadData(true);
  }

  function onTransactionUpdated(updatedTransaction) {
    setTransactionCurrentlyBeingUpdated(false);

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
