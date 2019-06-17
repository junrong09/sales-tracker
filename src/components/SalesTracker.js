import React from "react";
import {Bar, BarChart, CartesianGrid, LabelList, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

const data = [
    {
        "name": "Jan",
        "Actual": 4000,
        "Target": 2400
    },
    {
        "name": "Feb",
        "Actual": 3000,
        "Target": 1398
    },
    {
        "name": "Mar",
        "Actual": 2000,
        "Target": 9800
    },
    {
        "name": "Apr",
        "Actual": 2780,
        "Target": 3908
    }
]

class SalesTracker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sales: [[1,100],[2,200]]
        }
    }

    render() {
        return (
            <div className="flex flex-column items-center w-100">
                <p>{this.props.id} Monthly Sales</p>
                <ResponsiveContainer width="90%" height={300} >
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Actual" fill="#8884d8">
                            <LabelList dataKey="Actual" position="top"/>
                        </Bar>
                        <Bar dataKey="Target" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        )
    }
}

export default SalesTracker;