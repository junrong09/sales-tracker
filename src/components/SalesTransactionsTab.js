import React from "react";
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import {aggregateData} from "../classes/Transaction";

class SalesTransactionsTab extends React.Component {
    headersL1 = [
        {Header:'Header', columns:[{Header:'Time', accessor: 'time', minWidth: 50},{Header:'ID', accessor: 'transaction_id', minWidth: 50}]},
        {Header:'Sales', columns:[{Header:'Qty', accessor: 'qty', minWidth: 40},{Header:'Value', accessor: 'value', minWidth: 50}]}];
    headersL2 = [
        {Header:'SKU', accessor:'sku', minWidth: 40}, {Header:'Brand', accessor:'brand', minWidth: 50}, {Header:'Category', accessor:'category', minWidth: 50}, {Header:'Unit Value', accessor:'unit_value', minWidth: 40}, {Header:'Qty', accessor:'qty', minWidth: 30}, {Header:'Value', accessor:'value', minWidth: 40}
    ];

    // headersL2 = [
    //     {Header:'Product', columns: [{Header:'SKU', accessor:'sku', minWidth: 40}, {Header:'Brand', accessor:'brand', minWidth: 50}, {Header:'Category', accessor:'category', minWidth: 50}, {Header:'Unit Value', accessor:'unit_value', minWidth: 40}]},
    //     {Header: 'Sales', columns: [{Header:'Qty', accessor:'qty', minWidth: 30}, {Header:'Value', accessor:'value', minWidth: 40}]}
    // ];

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.props.date !== nextProps.data;
    }

    render() {
        let formattedData;
        if (typeof this.props.data !== "undefined") {
            console.log("aggr");
            formattedData = aggregateData(this.props.data);
        }

        return (
            <React.Fragment>
                <p className="b sans-serif mid-gray">{new Date().toLocaleDateString('en-US', {day: "numeric", month: "short", year: "numeric"})} : Sales Transactions</p>
                {typeof this.props.data !== "undefined" &&
                <ReactTable columns={this.headersL1} data={formattedData} defaultPageSize={10} className="-striped vh-75 w-90 pb2" showPageJump={false}
                    SubComponent={ row => {
                        return (
                            <div className="ph2 pv3">
                                <ReactTable columns={this.headersL2} data={row.original.lines} defaultPageSize={5} showPageJump={false} showPageSizeOptions={false}/>
                            </div>
                            );
                    }}
                />
                }

            </React.Fragment>
        )
    }
}

export default SalesTransactionsTab;