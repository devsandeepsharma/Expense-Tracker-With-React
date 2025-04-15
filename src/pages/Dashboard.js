import Progress from "../components/UI/Graphs/Progress";
import PieChart from "../components/UI/Graphs/PieChart";
import "./dashbord.css";

const Dashboard = () => {
    return (
        <main className="dashboard">
            <h1>Dashboard</h1>
            <div className="dashboard_budget">
                <h2 className="budget_title">
                    Monthly Budget <span>Default Account</span>
                </h2>
                <p className="budget_desc">Rs 500 spent out of 8000</p>
                <Progress value={5000} max={8000} />
                <p className="budget_used">{62} % used</p>
            </div>
            <div className="dashboard_transaction">
                <div className="transaction_history">
                    <h2 className="transaction_history_title">Recent Transactions</h2>
                    <ul className="transaction_history_wrapper">
                        {[...Array(5)].map((_, i) => (
                            <li key={i}>
                                <div>
                                    <h3>Flat Rent <span className="tag">(recurring)</span></h3>
                                    <p>Dec 8, 2025</p>
                                </div>
                                <p className="amount">Rs. 700</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="transaction_graph">
                    <h3>Monthly Expense Breakdown</h3>
                    <PieChart  data={[
                        { label: "Salary", value: 50000 },
                        { label: "Freelance", value: 10000 },
                        { label: "Dividends", value: 2000 },
                        { label: "Side Hustle", value: 5000 },
                    ]}/>
                </div>
            </div>
            <div className="dashboard_accounts">
                <ul className="accounts_wrapper">
                    <li className="accounts_button">
                        + Add New Account
                    </li>

                    {[1, 2].map((_, i) => (
                        <li className="account_card" key={i}>
                            <h3 className="account_title">Work</h3>
                            <p className="account_budget">Rs. 80,000</p>
                            <button className="account_toggle">Active</button>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    )
}

export default Dashboard;