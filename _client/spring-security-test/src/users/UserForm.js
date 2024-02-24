import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { apiGet, apiPut, apiPost } from "../utils/api";
import InputField from "../components/InputField";
import UserContext from "./UserContext";

function UserForm() {

    const [user, setUser] = useState({
        userId: "",
        name: "",
        email: "",
        password: "",
        birthDate: "",
        city: "",
        admin: false,
    });

    const { contextValues, setContextValues } = useContext(UserContext);
    const [isLoading, setIsloading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            setIsloading(true);
            apiGet("/user/" + id).then((data) => {
                setUser(data);
                setIsloading(false);
            });
        }
    }, [id]);

    const onSubmitHandle = (e) => {
        e.preventDefault();
        (id ? apiPut("/user", user) : apiPost("/user", user))
            .then(() => {
                setContextValues({ color: "success", message: "Uživatel " + (id ? "upraven." : "přidán.") });
                console.log("data nastavena: ", contextValues);
                navigate("/users");
            })
            .catch(() => {
                setContextValues({ color: "danger", message: "Při práci s databází nastala chyba..." })
                console.log("data nastavena: ", contextValues);
                navigate("/users");
            })
    }

    return (
        <div className="container mt-2">
            <h3>{id ? "Editace uživatele Id: " + id : "Přidání nového uživatele"}</h3>
            {isLoading ? (
                <p>Moment prosím, načítám data...</p>
            ) : (
                <form onSubmit={(e) => { onSubmitHandle(e) }}>
                    <InputField
                        type="text"
                        name="userName"
                        min="3"
                        label="Jméno uživatele:"
                        prompt="Zadejte jméno uživatele"
                        value={user.name}
                        handleChange={(e) =>
                            setUser({ ...user, name: e.target.value })
                        }
                    />
                    <InputField
                        type="text"
                        name="userEmail"
                        min="5"
                        label="Email uživatele:"
                        prompt="Zadejte email uživatele"
                        value={user.email}
                        handleChange={(e) =>
                            setUser({ ...user, email: e.target.value })
                        }
                    />
                    <InputField
                        type="text"
                        name="userPassword"
                        min="4"
                        label="Heslo uživatele:"
                        prompt="Zadejte heslo uživatele"
                        value={user.password}
                        handleChange={(e) =>
                            setUser({ ...user, password: e.target.value })
                        }
                    />
                    <InputField
                        type="date"
                        name="userBirthDate"
                        min="4"
                        label="Datum narození uživatele:"
                        prompt="Zadejte datum narození uživatele"
                        value={user.birthDate}
                        handleChange={(e) =>
                            setUser({ ...user, birthDate: e.target.value })
                        }
                    />
                    <InputField
                        type="text"
                        name="userCity"
                        min="2"
                        label="Město uživatele:"
                        prompt="Zadejte město uživatele"
                        value={user.city}
                        handleChange={(e) =>
                            setUser({ ...user, city: e.target.value })
                        }
                    />

                    <div className="form-check form-switch mt-3">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            checked={user.admin} // pouze pro výchozí zobrazení polohy přepínače
                            onChange={() => setUser({ ...user, admin: !user.admin })}
                            role="switch"
                            id="flexSwitchCheckChecked">
                        </input>
                        <label
                            className="form-check-label"
                            htmlFor="flexSwitchCheckChecked">{user.admin ? "Zakázat" : "Povolit"} administrátorská práva?
                        </label>
                    </div>
                    <button
                        type="button"
                        className="btn btn-secondary mt-3"
                        onClick={() => navigate("/")}
                    >Zpět
                    </button>
                    <button type="submit" className="btn btn-success mt-3 ms-1">Odeslat</button>
                </form>
            )}
        </div>
    )
}
export default UserForm
