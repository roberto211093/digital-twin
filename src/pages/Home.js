import React, {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import {deviceListApi, devicePerformanceApi} from "../api/api";
import Performance from "../components/Performance";
import List from "../components/List";

const Home = () => {
    const {data} = useContext(AuthContext);
    const {user} = data;
    const [devices, setDevices] = useState([]);
    const [performance, setPerformance] = useState([]);
    const [selectDevices, setSelectDevices] = useState([]);

    const fetchData = useCallback(async () => {
        try {
            const listDevice = await deviceListApi();
            const devices = new Set(listDevice.devices); // Un valor en un Set sólo puede estar una vez.
            // Con la linea anterior evitamos que el Camión OL9 se imprima 2 veces.
            setDevices([...devices]);
        } catch (e) {
            console.log(e);
        }
    }, [setDevices]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        setInterval(async () => {
            let res = await devicePerformanceApi();
            let data = [];
            res.devices.map((item, index) => {
                return data.push({
                    name: `${index + 1}) ${item}`,
                    // En la linea anterior utilizamos el index porque el Camión OL9 se repite
                    // pero con valores diferentes. Por ende, entiendo que son 2 camiones distintos
                    valor: res.values[index],
                });
            });
            setPerformance(data);
        }, 5000);
    }, []);

    return (
        <div className="row m-0">
            <div className="col col-12">
                <div className="d-flex justify-content-end mt-3">
                    <span className="align-self-center mr-3">
                        <b className="d-flex">Bienvenido</b>
                        {user.firstName} {user.lastName}
                    </span>
                    <img
                        src={user.profilePictureUrl}
                        className="rounded-circle"
                        alt={user.firstName + " " + user.lastName}
                        style={{width: "50px"}}
                    />
                </div>
            </div>

            <div className="col col-12">
                <div className="d-flex justify-content-center">
                    <h6>Performance de Equipo</h6>
                </div>
                {performance.length > 0 && (
                    <div className="d-flex justify-content-center">
                        <Performance data={performance}/>
                    </div>
                )}
            </div>

            <List
                devices={devices}
                selectDevices={selectDevices}
                setSelectDevices={(value) => setSelectDevices(value)}
            />
        </div>
    );
};

export default Home;
