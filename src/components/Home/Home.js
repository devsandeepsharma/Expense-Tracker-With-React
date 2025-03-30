import { Link } from "react-router-dom";

import "./home.css";

const Home = () => {
    return (
        <>
            <header>
                <h1>Expense Tracker</h1>
                <Link to="/edit">Edit Profile</Link>
            </header>
            <main>
                <h2>Welcome to expense tracker</h2>
            </main>
        </>
    )
}

export default Home;