import React, {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import {deviceListApi, devicePerformanceApi} from "../api/api";
import Performance from "../components/Performance";
import List from "../components/List";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import {WSS_PATH} from "../api/config";
import WebSocket from "../components/WebSocket";

const client = new W3CWebSocket(WSS_PATH);

const Home = () => {
    const {data} = useContext(AuthContext);
    const {user} = data;
    const [devices, setDevices] = useState([]);
    const [performance, setPerformance] = useState([]);
    const [selectDevices, setSelectDevices] = useState([]);
    const [dataSocket, setDataSocket] = useState([]);

    const fetchData = useCallback(async () => {
        try {
            const listDevice = await deviceListApi();
            setDevices(listDevice.devices);
        } catch (e) {
            console.log(e)
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
                return data.push({name: `${index + 1}) ${item}`, valor: res.values[index]});
            });
            setPerformance(data);
        }, 5000);
    }, []);

    useEffect(() => {
        client.onopen = () => {
            console.log('WebSocket Client Connected');
        };
        client.onmessage = (message) => {
            setDataSocket({
                ...message,data:message.data, timeStamp:message.timeStamp
            });
        };
    }, [setDataSocket]);


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


            <div className="col col-12">
                {performance.length > 0 &&
                <div className="d-flex justify-content-center">
                    <Performance data={performance}/>
                </div>
                }
                <div className="d-flex justify-content-center">
                    <h6>Performance de Equipo</h6>
                </div>
            </div>

            <div className="col col-12 col-md-2">
                <List devices={devices} setSelectDevices={setSelectDevices}/>
            </div>

            <div className="col col-12 col-md-10">
                <WebSocket selectDevices={selectDevices} dataSocket={dataSocket}/>
            </div>
        </div>
    )
}

export default Home
