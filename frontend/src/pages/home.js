import React, { useState, useEffect } from "react";

const Home = () => {
    const [expenses, setExpenses] = useState([]);
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        const response = await fetch("http://localhost:5000/api/expenses");
        const data = await response.json();
        setExpenses(data);
    };

    const addExpense = async () => {
        const newExpense = { title, amount, category };
        await fetch("http://localhost:5000/api/expenses", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newExpense),
        });
        fetchExpenses();
    };

    const deleteExpense = async (id) => {
        await fetch(`http://localhost:5000/api/expenses/${id}`, { method: "DELETE" });
        fetchExpenses();
    };

    return (
        <div>
            <h2>Add Expense</h2>
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
            <button onClick={addExpense}>Add</button>

            <h2>Expense List</h2>
            <ul>
                {expenses.map((expense) => (
                    <li key={expense._id}>
                        {expense.title} - ${expense.amount} ({expense.category})
                        <button onClick={() => deleteExpense(expense._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
