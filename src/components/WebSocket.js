import React from "react";
import moment from 'moment';
import 'moment/locale/es.js';

const WebSocket = (props) => {
    const {/*selectDevices,*/ dataSocket} = props;
    // console.log("dataSocket: ", dataSocket)
    // console.log("selectDevices: ", selectDevices);
    if (dataSocket.length > 0) {
        let aux = dataSocket.data.split("|");
        console.log("aux[0]: ",aux[0]);
    }

    return (
        <>
            <h6>Estado de equipos:</h6>
            {dataSocket.data} {moment(dataSocket.timeStamp).calendar()}
        </>
    )
}

export default WebSocket
