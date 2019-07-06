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
import LocalStorage from "./LocalStorage";

class SalesOverallTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sales: undefined,
            target: LocalStorage.getTarget(this.props.id, new Date()),
            transCount: undefined,
            memberServed: undefined
        }
    }

    roundToHundreds = (num) => {
        return Math.ceil(num / 100) * 100;
    };

    computeAggregate = () => {
        let data = this.props.data;
        if (typeof data === "undefined") {
            console.log("Compute Aggregate : undefined");
            return;
        }
        console.log("Computed Aggregate");

        if (data.length === 0) {
            this.setState({sales: 0});
            this.setState({transCount: 0});
            this.setState({memberServed: 0});
        } else {
            let sales = data.map(obj => parseFloat(obj.value)).reduce((acc, val) => acc+val);
            this.setState({sales: sales});
            let transCount = (new Set(data.map(obj => obj.txnNum))).size;
            this.setState({transCount: transCount});
            let memberServed = (new Set(data.map(obj => obj.memberNum))).size;
            this.setState({memberServed: memberServed});
        }

    };

    componentDidMount() {
        this.computeAggregate();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.data !== this.props.data)
            this.computeAggregate();
    }

    render() {
        return (
            <div className="flex flex-column items-center vh-75 w-100">
                <p className="b sans-serif mid-gray">{new Date().toLocaleDateString('en-US', {day: "numeric", month: "short", year: "numeric"})} : Sales Chart</p>
                <ResponsiveContainer width="90%" height="60%" className="mt2">
                    <ComposedChart data={[this.state]}>
                        <CartesianGrid stroke="#f5f5f5"/>
                        <YAxis domain={[0, (num) => this.roundToHundreds(num * 1.15)]}>
                            <Label value="Sales Amount" angle={270} position="insideLeft"/>
                        </YAxis>
                        <Tooltip />
                        <Legend verticalAlign="bottom"/>
                        <Bar dataKey="target" fill="#82ca9d" maxBarSize={70}>
                            <LabelList dataKey="target" position="top"/>
                        </Bar>
                        <Bar dataKey="sales" fill="#413ea0" maxBarSize={70}>
                            <LabelList dataKey="sales" position="top"/>
                        </Bar>
                    </ComposedChart>
                </ResponsiveContainer>
                <p className="b sans-serif mid-gray f5 mt3">Transactions Completed:
                    {this.state.transCount}
                </p>
                <p className="b sans-serif mid-gray f5 ma0">Members Served:
                    {this.state.memberServed}
                </p>
            </div>
        )
    }
}

export default SalesOverallTab;