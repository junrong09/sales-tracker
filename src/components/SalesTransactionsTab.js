import React from "react";
import {Column, Table} from "react-virtualized";
import 'react-virtualized/styles.css';

class SalesTransactionsTab extends React.Component {
    render() {
        let isPropDefined = false;
        if (typeof this.props.data !== "undefined") {
            isPropDefined = true;
        }

        return (
            <React.Fragment>
                <p className="b sans-serif mid-gray">{new Date().toLocaleDateString('en-US', {day: "numeric", month: "short", year: "numeric"})} : Sales Transactions</p>
                {isPropDefined &&
                <React.Fragment/>
                }

            </React.Fragment>
        )
    }
}

export default SalesTransactionsTab;