import React from "react";
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import {aggregateData} from "../classes/Transaction";

class SalesTransactionsTab extends React.Component {
    headersL1 = [
        {Header:'Header', columns:[{Header:'Time', accessor: 'time'},{Header:'ID', accessor: 'transaction_id'}]},
        {Header:'Sales', columns:[{Header:'Qty', accessor: 'qty'},{Header:'Value', accessor: 'value'}]},
        {Header:'Membership', columns:[{Header:'Member ID', accessor: 'member_id'}]}
        ];
    headersL2 = [
        {Header:'Product', columns: [{Header:'SKU', accessor:'sku'}, {Header:'Brand', accessor:'brand'}, {Header:'Category', accessor:'category'}, {Header:'Unit Value', accessor:'unit_value'}]},
        {Header: 'Sales', columns: [{Header:'Qty', accessor:'qty'}, {Header:'Value', accessor:'value'}]}
    ];


    render() {
        let isPropDefined = false;
        let formattedData;
        if (typeof this.props.data !== "undefined") {
            isPropDefined = true;
            formattedData = aggregateData(this.props.data);
        }

        return (
            <React.Fragment>
                <p className="b sans-serif mid-gray">{new Date().toLocaleDateString('en-US', {day: "numeric", month: "short", year: "numeric"})} : Sales Transactions</p>
                {isPropDefined &&
                <ReactTable columns={this.headersL1} data={formattedData}
                    SubComponent={ row => {
                        console.log(row.original.lines);
                        return <ReactTable columns={this.headersL2} data={row.original.lines}/>;
                    }}
                />
                }

            </React.Fragment>
        )
    }
}

export default SalesTransactionsTab;