import { useCallback, useEffect, useState } from "react";

const AddExpenseForm = () => {
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Food");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [expenses, setExpenses] = useState([]);

    const addExpenseHandler = (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (!amount || !description) {
            setError("Please fill all fields!");
            setLoading(false);
            return;
        }

        addExpense({amount, description, category});
        
        setAmount("");
        setDescription("");
        setCategory("Food");
    };

    const addExpense = async (expense) => {
        try {
            const res = await fetch("https://expense-tracker-3a081-default-rtdb.firebaseio.com/expenses.json", {
                method: "POST",
                body: JSON.stringify(expense)
            })

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error.message);
            }

            console.log(data);
            setLoading(false);
            getExpense();
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }

    const getExpense = async (expense) => {
        try {
            const res = await fetch("https://expense-tracker-3a081-default-rtdb.firebaseio.com/expenses.json")

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error.message);
            }

            const filterExpenses = [];

            for(const key in data) {
                filterExpenses.push({
                    id: key,
                    category: data[key].category,
                    description: data[key].description,
                    amount: data[key].amount
                })
            }

            setExpenses(filterExpenses);
            setLoading(false);
            console.log(data)
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        getExpense();
    }, [])

    return (
        <div style={{marginTop: "16px", padding: "0 64px"}}>
            <form className="form" onSubmit={addExpenseHandler}>
                <h2>Add Daily Expense</h2>
                <input
                    type="number"
                    placeholder="Amount spent"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Expense description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Salary">Salary</option>
                    <option value="Shopping">Shopping</option>
                </select>
                <button className="primary" type="submit">{loading ? "Adding": "Add Expense"}</button>
                <p>{error && error}</p>
            </form>

            <h3 style={{margin: "24px 0", fontSize: "30px"}}>Expenses List</h3>
            {expenses.length === 0 ? (
                <p>No expenses added yet.</p>
            ) : (
                <ul style={{display: "flex", flexWrap: "wrap"}}>
                    {expenses.map((expense) => (
                        <li
                            style={{
                                display: "flex", 
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "flex-start",
                                gap: "8px",
                                border: "1px solid",
                                padding: "16px",
                                width: "200px"
                            }}
                            key={expense.id}
                        >
                            <h2>{expense.category}</h2>
                            <p style={{fontSize:"20px"}}>Rs. {expense.amount}/-</p>
                            <p>{expense.description}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AddExpenseForm;
