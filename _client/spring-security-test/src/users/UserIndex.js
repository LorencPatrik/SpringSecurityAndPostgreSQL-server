import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { apiGet, apiDelete } from '../utils/api';
import FlashMessage from "../components/FlashMessage";
import UserContext from "./UserContext";

function ShowUsers() {
    // show all users from database

    const [isLoading, setIsloading] = useState(true);
    const [users, setUsers] = useState(undefined);
    const navigate = useNavigate();
    
    
    const { contextValues, setContextValues } = useContext(UserContext);
    const color = contextValues.color;
    const message = contextValues.message;
    console.log("context: color = " + color + ", message = " + message);
    const [show, setShow] = useState(message ? true : false);
    console.log("stav show: " + (message ? true : false))

    useEffect(() => {
        startCountDown();
        async function fetchData() {
            setIsloading(true);
            setUsers(await apiGet("/users"));
            setIsloading(false);
        };
        fetchData();
    }, [])

    useEffect(() => {
        if (contextValues.message === "Uživatel vymazán") {
            setShow(true);
            startCountDown();
            async function fetchData() {
              setUsers(await apiGet("/users"));
            };
            fetchData();
          }
        }, [contextValues]);
       
    const startCountDown = () => {
        const timer = setTimeout(() => {
            setShow(false);
        }, 5000)
        return () => clearTimeout(timer);
    }

        const messageHandle = () => {
            setShow(false);
        }

        const onClickHandle = (userId) => {
            navigate("/users/user/" + userId);
        }

        const deleteHandle = (id) => {
            apiDelete("/user/" + id)
                .then(() => {
                    setContextValues({ color: "success", message: "Uživatel vymazán"});
                        console.log("po vymazání uživ", contextValues);
                });
        }

    return (
        <div className="container mt-2">
            <h3>Výpis všech zaregistrovaných uživatelů</h3><br />
            {isLoading ? (
                <p>načítám data...</p>    
            ) : (
                <>
                {show && <FlashMessage
                            message={message}
                            color={color}
                            messageHandle={messageHandle}
                         />
                }
                <table className="table table-bordered table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th>Id</th>
                            <th>Jméno</th>
                            <th>Email</th>
                            <th>City</th>
                            <th>Admin</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {users.map((oneUser) => (
                        <tr key = {oneUser.userId}>
                            <td>{oneUser.userId}</td>
                            <td onClick={() => onClickHandle(oneUser.userId)}>{oneUser.name}</td>
                            <td onClick={() => onClickHandle(oneUser.userId)}>{oneUser.email}</td>
                            <td onClick={() => onClickHandle(oneUser.userId)}>{oneUser.city}</td>
                            <td onClick={() => onClickHandle(oneUser.userId)}>{oneUser.admin ? 'ano' : 'ne'}</td>
                            <td>
                                <Link
                                    to={"/users/user/" + oneUser.userId}
                                    className="btn btn-info py-1"
                                    >Detail
                                </Link>
                                <Link
                                    to={"/users/userForm/" + oneUser.userId}
                                    className="btn btn-primary py-1 mx-1"
                                    >Editovat
                                </Link>
                                <button
                                    type="button"
                                    className="btn btn-danger py-1"
                                    onClick={() => deleteHandle(oneUser.userId)}
                                    >Smazat
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {users.length === 0 ?
                    <h6 className="text-danger pb-3">Databáze je prázdná... Vložte nového uživatele...</h6>
                    :
                    null
                }
                    <Link to={"/users/createUser"} className="btn btn-success">Vložit nového uživatele</Link>
                </>
            )}
        </div>
    )
}
export default ShowUsers