import React, {useContext} from "react";
import {AuthContext} from "../context/AuthContext";

const Home = () => {
    const {data} = useContext(AuthContext);
    const {user} = data;
    return (
        <div className="row m-0">
            <div className="col col-12">
                <div className="d-flex justify-content-end mt-3">
                    <span className="align-self-center mr-3"><b className="d-flex">Bienvenido</b>
                        {user.firstName} {user.lastName}
                    </span>
                    <img src={user.profilePictureUrl} className="rounded-circle"
                         alt={user.firstName + " " + user.lastName} style={{width: "50px"}}/>
                </div>
            </div>

            <div className="col col-12 col-md-6">
                <div>Lista de equipos</div>
            </div>

            <div className="col col-12 col-md-6">
                <div>Estado de equipos</div>
            </div>
        </div>
    )
}

export default Home
