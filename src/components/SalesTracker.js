import React from "react";

class SalesTracker extends React.Component {
    render() {
        return (
            <div className="flex flex-column">
                <p>Testing: {this.props.id}</p>
            </div>
        )
    }
}

export default SalesTracker;