import React from "react";

class TabBar extends React.Component {
    render() {
        return (
            <div className="flex w-100">
                <div className="sans-serif underline-hover"
                     onClick={() => this.props.onTabChange("overall")}>Overall</div>
                <div className="sans-serif underline-hover"
                     onClick={() => this.props.onTabChange("transactions")}>Transactions</div>
            </div>
        )
    }
}

export default TabBar;