import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from 'react';
import { apiGet } from './utils/api';

function MyApp() {

    const [isLoading, setIsloading] = useState (true);
    const [users, setUsers] = useState (undefined);

    useEffect(() => {
        async function fetchData() {
            setIsloading(true);
            setUsers(await apiGet("/user"));
            setIsloading(false);
        };
        fetchData();
    }, [])

  return (
    <div className="container">
        <h3>Výpis všech zaregistrovaných uživatelů:</h3><br />
        {isLoading ? (
            <p>načítám data...</p>    
        ) : (
            <table className="table table-bordered table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th>Id</th>
                        <th>Jméno</th>
                        <th>Email</th>
                        <th>City</th>
                        <th>Admin</th>
                    </tr>
                </thead>
                <tbody>
                {users.map((oneUser) => (
                    <tr key = {oneUser.userId}>
                        <td>{oneUser.userId}</td>
                        <td>{oneUser.name}</td>
                        <td>{oneUser.email}</td>
                        <td>{oneUser.city}</td>
                        <td>{oneUser.admin ? 'ano' : 'ne'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        )}
    </div>
  )
}
export default MyApp

// admin: undefined,
// birthDate: undefined,
// city: undefined,
// email: undefined,
// name: undefined,
// password: undefined,
// userId: undefined
