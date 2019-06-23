import React from "react";

class TabBar extends React.Component {

    render() {
        let active = (tab) => (this.props.tab === tab ? "blue bb bw2 pb1": "mid-gray");

        return (
            <div className="flex w-100 ph1 mt3 bb light-gray">
                <div className={"b mr2 sans-serif hover-blue " + active("overall")}
                     onClick={() => this.props.onTabChange("overall")}>Overall</div>
                <div className={"b mr2 sans-serif hover-blue " + active("transactions")}
                     onClick={() => this.props.onTabChange("transactions")}>Transactions</div>
                <div className={"b sans-serif hover-blue " + active("targetSetter")}
                     onClick={() => this.props.onTabChange("targetSetter")}>Target</div>
            </div>
        )
    }
}

export default TabBar;