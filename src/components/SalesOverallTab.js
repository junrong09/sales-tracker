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
    YAxis
} from "recharts";

class SalesOverallTab extends React.Component {

    render() {
        var transactionCount = typeof this.props.data.transactionCount === "undefined" ?
            0 : this.props.data.transactionCount;
        var memberCount = typeof this.props.data.memberCount === "undefined" ?
            0 : this.props.data.memberCount;

        return (
            <React.Fragment>
                <p className="b">10 Aug 2018 : Sales Chart</p>
                <ResponsiveContainer width="90%" height="60%" className="mt2">
                    <ComposedChart data={[this.props.data]}>
                        <CartesianGrid stroke="#f5f5f5"/>
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
                <p className="b f5 mt3">Transactions Completed: {transactionCount}</p>
                <p className="b f5 ma0">Members Served: {memberCount}</p>
            </React.Fragment>
        )
    }
}

export default SalesOverallTab;