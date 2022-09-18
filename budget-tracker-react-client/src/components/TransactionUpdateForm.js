import React, { useState } from 'react'
import Constants from '../utilities/Constants'

export default function TransactionUpdateForm(props) {
    const initalFormData = Object.freeze({
        value: props.transaction.value,
        note: props.transaction.note
    });

    const [formData, setFormData] = useState(initalFormData);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isNaN(formData.value) || formData.value === "") {
            alert("Please input a valid value")
        } else {
            const transactionToUpdate = {
                transactionId: props.transaction.transactionId,
                value: formData.value,
                note: formData.note
            };

            const url = Constants.API_URL_UPDATE_TRANSACTION;

            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(transactionToUpdate)
            })
                .then(response => response.json())
                .then(responseFromServer => {
                    console.log(responseFromServer);
                })
                .catch((error) => {
                    console.log(error);
                    alert(error);
                });

            props.onTransactionUpdated(transactionToUpdate);
        }
    };

    return (
        <form className="w-100 px-5">
            <h1 className="mt-4 text-primary">Update Transaction</h1>

            <div className="mt-5">
                <label className="h3 form-label">Transaction Value</label>
                <input value={formData.value} name="value" type="number" step="0.01" className="form-control"
                    onChange={handleChange} />
            </div>

            <div className="mt-4">
                <label className="h3 form-label">Transaction Note</label>
                <input value={formData.note} name="note" type="text" className="form-control"
                    onChange={handleChange} />
            </div>

            <button onClick={handleSubmit} className="btn btn-primary btn-lg w-100 mt-5">Submit</button>
            <button onClick={() => props.onTransactionUpdated(null)} className="btn btn-secondary btn-lg w-100 mt-3">Cancel</button>
        </form>
    );
}
