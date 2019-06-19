import React from "react";
import {
    Bar,
    CartesianGrid,
    ComposedChart,
    Label,
    LabelList,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";

class SalesTracker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: undefined
        }
    }

    componentDidMount() {
        fetch("http://localhost:8080/sales?user=" + this.props.id, {
            method: 'get'})
            .then(raw  => raw.json())
            .then(data => {
                this.setState({data: [data]});
            })
            .catch(console.log);
    }

    render() {
        return (
            <div className="flex flex-column items-center vh-50 w-100 mw6">
                <p className="b">10 Aug 2018 : Sales Chart</p>
                <ResponsiveContainer width="90%" height="100%" className="mt2">
                    <ComposedChart data={this.state.data}>
                        <CartesianGrid stroke="#f5f5f5"/>
                        <XAxis dataKey="month">
                        </XAxis>
                        <YAxis domain={['auto','dataMax + 100']}>
                            <Label value="Sales Amount" angle={270} position="insideLeft"/>
                        </YAxis>
                        <Tooltip />
                        <Legend verticalAlign="bottom"/>
                        <Bar dataKey="target" fill="#82ca9d" maxBarSize={70}>
                            <LabelList dataKey="target" position="top" className="f6"/>
                        </Bar>
                        <Bar dataKey="actual" fill="#413ea0" maxBarSize={70}>
                            <LabelList dataKey="actual" position="top" className="f6"/>
                        </Bar>
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        )
    }
}

export default SalesTracker;