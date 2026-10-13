import UserList from "../components/UserList";
import "./Users.css";

function Users() {

    return (
        <div className="users-page">

            <div className="users-page-heading">

                <div>
                    <h2>User Data</h2>

                    <p>
                        View and manage all registered users
                    </p>
                </div>

            </div>

            <UserList />

        </div>
    );
}

export default Users;