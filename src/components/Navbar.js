import React, {useContext} from 'react';
import {withRouter, Link, NavLink} from 'react-router-dom';
import {logout} from "../api/api";
import {AuthContext} from "../context/AuthContext";

const Navbar = (props) => {
    const {user} = props;
    const {data, setData} = useContext(AuthContext);

    const closeSession = () => {
        logout();
        setData({...data, user: null})
    }
    return (
        <div className="navbar navbar-dark">
            <Link to="/" className="navbar-brand">Digital Twin</Link>
            <div className="d-flex">
                {
                    user !== null
                        ? <button
                            className="btn btn-dark"
                            type="button"
                            onClick={() => closeSession()}
                        >
                            Cerrar Session
                        </button>
                        : <NavLink
                            className="btn btn-dark"
                            to="/login"
                        >
                            Login
                        </NavLink>
                }
            </div>
        </div>
    )
}

export default withRouter(Navbar);
