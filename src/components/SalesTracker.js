import React from "react";
import TabBar from "./TabBar";
import SalesOverallTab from "./SalesOverallTab";
import SalesTransactionsTab from "./SalesTransactionsTab";
import SalesTargetSetterTab from "./SalesTargetSetterTab";

class SalesTracker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: "overall"
        }
    }

    onTabChange = (newTab) => {
        this.setState({tab: newTab});
        this.props.onTransactionsFetch();
    };

    componentDidMount() {
        this.props.onTransactionsFetch();
    }

    render() {
        return (
            <div className="flex flex-column items-center vh-75 w-100 mw6">
                <TabBar onTabChange={this.onTabChange} tab={this.state.tab}/>
                {this.state.tab === "overall" && <SalesOverallTab data={this.props.transactions} id={this.props.id}/>}
                {this.state.tab === "transactions" && <SalesTransactionsTab data={this.props.transactions}/>}
                {this.state.tab === "targetSetter" && <SalesTargetSetterTab data={this.props.transactions} id={this.props.id}/>}
            </div>
        )
    }
}

export default SalesTracker;