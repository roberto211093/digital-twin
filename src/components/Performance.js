import React from 'react';
import {
    BarChart, Bar, XAxis, Tooltip
} from 'recharts';

const Performance = (props) => {
    const {data} = props;

    return (
        <>
            <BarChart
                width={300}
                height={100}
                data={data}
                margin={{
                    top: 5, right: 2, left: 2, bottom: 5,
                }}
                barSize={10}
            >
                <XAxis dataKey="name" scale="point" padding={{left: 2, right: 2}} hide={true}/>
                <Tooltip/>
                <Bar dataKey="valor" fill="#8884d8" background={{fill: '#eeeeee'}}/>
            </BarChart>
        </>
    );
}
export default Performance
