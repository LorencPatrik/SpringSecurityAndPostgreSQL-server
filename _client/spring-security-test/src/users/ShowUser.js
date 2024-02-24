import './ShowUser.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { apiGet, apiDelete } from '../utils/api';
import Moment from 'react-moment';

const ShowUser = () => {

    const [user, setUser] = useState();
    const [isloading, setIsloading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setIsloading(true);
        apiGet("/user/" + id).then((data) => {
            setUser(data);
            setIsloading(false);
            
        });
    }, [id]);

    const deleteHandle = () => {
        apiDelete("/user/" + user.userId)
            .then(() => navigate("../users"));
    }

    return (
        <div className="container mt-2">
            <h3>Výpis uživatele: </h3>
            {isloading ? (
                <p>Moment prosím, načítám data...</p>
            ):(
                <div>
                    <table className="table my-4">
                        <tbody>
                            <tr>
                                <td>Jméno uživatele:</td>
                                <td>{user.name} (Id: {user.userId})</td>
                            </tr>
                            <tr>
                                <td>Email:</td>
                                <td>{user.email}</td>
                            </tr>
                            <tr>
                                <td>Heslo:</td>
                                <td>{user.password}</td>
                            </tr>
                            <tr>
                                <td>Datum narození:</td>
                                <td>
                                    <Moment format="D.M.YYYY">
                                        {user.birthDate}
                                    </Moment>
                                </td>
                            </tr>
                            <tr>
                                <td>Město:</td>
                                <td>{user.city}</td>
                            </tr>
                            <tr>
                                <td>Administrátor:</td>
                                <td>{user.admin ? "ano" : "ne"}</td>
                            </tr>
                        </tbody>
                        
                    </table>
                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="btn btn-secondary"
                            >Zpět
                        </button>
                        <Link
                            to={"/users/userForm/" + user.userId}
                            className="btn btn-primary ms-1 me-1"
                            >Editovat
                        </Link>
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={deleteHandle}
                            >Smazat
                        </button>
                </div>
            )}
        </div>
    )

}

export default ShowUser;