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
        this.props.onFetch();

    };

    componentDidMount() {
        this.props.onFetch();
    }

    render() {
        return (
            <div className="flex flex-column items-center w-100 mw7">
                <TabBar onTabChange={this.onTabChange} tab={this.state.tab}/>
                {this.state.tab === "overall" && <SalesOverallTab data={this.props.transactions} id={this.props.id} bizDate={this.props.bizDate} curTarget={this.props.bizDate === this.props.targetBizDate ? this.props.curTarget : 0}/>}
                {this.state.tab === "transactions" && <SalesTransactionsTab data={this.props.transactions} bizDate={this.props.bizDate}/>}
                {this.state.tab === "targetSetter" && <SalesTargetSetterTab data={this.props.transactions} id={this.props.id} bizDate={this.props.bizDate} targetBizDate={this.props.targetBizDate} curTarget={this.props.curTarget} onCurTargetChange={this.props.onCurTargetChange} onTargetBizDateChange={this.props.onTargetBizDateChange}/>}
            </div>
        )
    }
}

export default SalesTracker;