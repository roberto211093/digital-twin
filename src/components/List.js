import React, {useState} from "react";
import WebSocket from "./WebSocket";

const useForceUpdate = () => {
    const [value, setValue] = useState(0);
    return () => setValue((value) => ++value); // Se actualiza el state para forzar el render
};

const List = (props) => {
    const {devices, setSelectDevices, selectDevices} = props;
    const forceUpdate = useForceUpdate();

    const changeSelected = (value) => {
        let aux = selectDevices;
        let index = aux.indexOf(value);
        index > -1 ? aux.splice(index, 1) : aux.push(value);
        setSelectDevices(aux);
        forceUpdate();
    };

    return (
        <>
            <div className="col col-12 col-md-3 col-lg-2">
                <h6>Lista de equipos:</h6>
                <form>
                    {devices.map((item, index) => {
                        return (
                            <div className="custom-control custom-switch" key={index}>
                                <input
                                    className="custom-control-input"
                                    type="checkbox"
                                    value={item}
                                    id={item + index}
                                    checked={selectDevices.includes(item)}
                                    onChange={(e) => changeSelected(e.target.value)}
                                />
                                <label className="custom-control-label" htmlFor={item + index}>
                                    {item}
                                </label>
                            </div>
                        );
                    })}
                </form>
            </div>
            <WebSocket devices={devices} selectDevices={selectDevices}/>
        </>
    );
};

export default List;
