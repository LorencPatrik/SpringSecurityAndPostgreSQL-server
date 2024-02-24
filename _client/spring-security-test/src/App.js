import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import "./App.css";
import UserIndex from "./users/UserIndex";
import ShowUser from "./users/ShowUser";
import UserForm from "./users/UserForm";
import UserContext from "./users/UserContext";

function App() {

  const [contextValues, setContextValues] = useState({ color: "", message: ""});

  return (
    <UserContext.Provider value={{ contextValues, setContextValues }}>
    <BrowserRouter>
    <div className="container">
      {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/movies"} className="nav-link">
              Filmy
            </Link>
          </li>

          <li className="nav-item">
            <Link to={"/people"} className="nav-link">
              Osobnosti
            </Link>
          </li>
        </ul>
      </nav> */}
      
      <Routes>
        <Route index element={<Navigate to={"/users"} />} />        {/* sem půjdeme po načtení (celá adresa) */}
        <Route path="/users/">                                      {/* spol. část adresy pro celý blok */}
          <Route index element={<UserIndex />} />                   {/* výchozí element na spol. adrese */}
          <Route path=":message/:color" element={<UserIndex />} />  {/* shodná adresa s index, ale s parametry navíc */}
          <Route path="user/:id" element={<ShowUser />} />
          <Route path="createUser" element={<UserForm />} />
          <Route path="userForm/:id" element={<UserForm />} />
        </Route>
      </Routes>
    </div>
  </BrowserRouter>
  </UserContext.Provider>
  );
}

export default App;
