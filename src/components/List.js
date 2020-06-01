import React from "react";

const List = (props) => {
    const {devices} = props;
    const changeSelected = (e) => {
        console.log("changeSelected: ", e.target.value);
    }

    return (
        <>
            <h6>Lista de equipos:</h6>
            <form>
                {
                    devices.map((item, index) => {
                        return (
                            <div className="form-check" key={index}>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value={item}
                                    id={item + index}
                                    onChange={e => changeSelected(e)}
                                />
                                <label className="form-check-label" htmlFor={item + index}>
                                    {item}
                                </label>
                            </div>
                        )
                    })
                }
            </form>
        </>)
}

export default List
