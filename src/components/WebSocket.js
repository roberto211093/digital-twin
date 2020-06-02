import React, {useEffect, useState} from "react";
import moment from 'moment';
import 'moment/locale/es.js';
import {w3cwebsocket as W3CWebSocket} from "websocket";
import {WSS_PATH} from "../api/config";

const client = new W3CWebSocket(WSS_PATH);

const CardData = (props) => {
    const {device, dataSocket} = props;
    let dataSort = dataSocket.sort((a, b) => moment(b.time).format("LTS").localeCompare(moment(a.time).format("LTS")));
    // En la linea anterior se ordena de manera descendiente cronológicamente la data recibida.

    return (
        <>{

            dataSort.map((item, index) => {
                return (
                    device === item.key ?
                        <p key={item + index} className="card-text">
                            {item.status === 'OK'
                                ?
                                <svg className="bi bi-check-circle-fill mr-3" width="1em" height="1em" viewBox="0 0 16 16"
                                       fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                </svg>
                                :
                                <svg className="bi bi-exclamation-triangle-fill mr-3" width="1em" height="1em"
                                     viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                          d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 5zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                                </svg>
                            }
                            {item.key}|{item.status}<b> {moment(item.time).format("LTS")}</b>
                        </p>
                        : null
                )
            })
        }
        </>
    )
}

const WebSocket = (props) => {
    const {devices, selectDevices} = props;
    const [dataSocket, setDataSocket] = useState([]);

    useEffect(() => {
        client.onopen = () => {
            console.log("WebSocket Client Connected");
        };

        client.onmessage = (message) => {
            let aux = devices;
            let temp = dataSocket;
            let split = message.data.split("|");
            if (aux.includes(split[0])) {
                temp.push({
                    status: split[1],
                    key: split[0],
                    time: message.timeStamp,
                });
            }
            setDataSocket(temp);
        };
    }, [setDataSocket, devices, dataSocket]);

    return (
        <div className="col col-12 col-md-9 col-lg-10">
            <h6>Estado de equipos:</h6>
            {
                selectDevices.length === 0 && (
                    <p>¡Vamos! Selecciona un equipo</p>
                )
            }
            <div className="d-flex flex-wrap">
                {
                    selectDevices.length > 0 && (
                        selectDevices.map((device) => {
                            return (
                                <div key={device} className="col col-12 col-md-4 mb-3">
                                    <div className="card bg-light text-dark overflow-auto h-120px">
                                        <div className="card-body">
                                            <h5 className="card-title">{device}</h5>
                                            <CardData device={device} dataSocket={dataSocket}/>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    )
                }
            </div>
        </div>
    )
}

export default WebSocket
