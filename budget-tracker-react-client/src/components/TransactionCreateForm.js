import React, { useState } from 'react'
import Constants from '../utilities/Constants'

export default function TransactionCreateForm(props) {
    const initalFormData = Object.freeze({
        value: "0",
        note: ""
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

        const transactionToCreate = {
            transactionId: 0,
            value: formData.value,
            note: formData.note
        };

        const url = Constants.API_URL_CREATE_TRANSACTION;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transactionToCreate)
        })
            .then(response => response.json())
            .then(responseFromServer => {
                console.log(responseFromServer);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });

        props.onTransactionCreated(transactionToCreate);
    };

    return (
        <div>
            <form className="w-100 px-5">
                <h1 className="mt-5">Create new Transaction</h1>

                <div className="mt-5">
                    <label className="h3 form-label">Transaction value</label>
                    <input value={formData.value} name="value" type="number" step="0.01" className="form-control"
                        onChange={handleChange} />
                </div>

                <div className="mt-4">
                    <label className="h3 form-label">Transaction Note</label>
                    <input value={formData.note} name="note" type="text" className="form-control"
                        onChange={handleChange} />
                </div>

                <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Submit</button>
                <button onClick={() => props.onTransactionCreated(null)} className="btn btn-secondary btn-lg w-100 mt-5">Cancel</button>
            </form>
        </div>
    );
}
