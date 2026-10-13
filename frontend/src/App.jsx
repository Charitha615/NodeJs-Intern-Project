import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import CreateUser from "./pages/CreateUser";
import Users from "./pages/Users";

import "./App.css";

function App() {

    return (
        <BrowserRouter>

            <div className="app">

                {/* NAVBAR */}

                <header className="navbar">

                    {/* BRAND */}

                    <Link to="/create" className="brand">

                        <div className="brand-icon">
                            U
                        </div>

                        <div>
                            <h1>User Management</h1>
                        </div>

                    </Link>


                    {/* NAVIGATION */}

                    <nav className="nav-links">

                        <Link to="/create">
                            Create User
                        </Link>

                        <Link to="/users">
                            User Data
                        </Link>

                    </nav>


                    {/* SYSTEM STATUS */}

                    <div className="status">

                        <span className="status-dot"></span>

                        System Online

                    </div>

                </header>


                {/* PAGE CONTENT */}

                <main>

                    <Routes>

                        {/* Default page */}

                        <Route
                            path="/"
                            element={<CreateUser />}
                        />


                        {/* Create User Page */}

                        <Route
                            path="/create"
                            element={<CreateUser />}
                        />


                        {/* User Data Page */}

                        <Route
                            path="/users"
                            element={<Users />}
                        />

                    </Routes>

                </main>


                {/* FOOTER */}

                <footer className="footer">

                    <p>
                        User Management System
                    </p>

                    <span>
                        Built with React & Node.js
                    </span>

                </footer>

            </div>

        </BrowserRouter>
    );
}

export default App;