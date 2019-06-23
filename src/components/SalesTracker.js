import React from "react";
import TabBar from "./TabBar";
import SalesOverallTab from "./SalesOverallTab";
import SalesTransactionsTab from "./SalesTransactionsTab";
import SalesTargetSetterTab from "./SalesTargetSetterTab";

class SalesTracker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            tab: "transactions"
        }
    }

    onTabChange = (newTab) => (this.setState({tab: newTab}));

    componentDidMount() {
        fetch("http://localhost:8080/salesprofile?user=" + this.props.id, {
            method: 'get'})
            .then(raw  => raw.json())
            .then(data => {
                this.setState({data: data});
            })
            .catch(console.log);
    }

    render() {
        return (
            <div className="flex flex-column items-center vh-75 w-100 mw6">
                <TabBar onTabChange={this.onTabChange} tab={this.state.tab}/>
                {this.state.tab === "overall" && <SalesOverallTab data={this.state.data}/>}
                {this.state.tab === "transactions" && <SalesTransactionsTab data={this.state.data}/>}
                {this.state.tab === "targetSetter" && <SalesTargetSetterTab data={this.state.data}/>}
            </div>
        )
    }
}

export default SalesTracker;