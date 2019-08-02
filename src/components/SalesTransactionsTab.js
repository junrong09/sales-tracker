import React from "react";
import ReactTable, {ReactTableDefaults} from 'react-table'
import 'react-table/react-table.css'
import {aggregateData} from "../classes/Transaction";
import {FORMAT_DATE_LOCALE, NOW_DATE_FORMATTED} from "./Constant";
import SalesLineItemsTable from "./SalesLineItemsTable";

class SalesTransactionsTab extends React.Component {
    headersL1 = [
        {Header: 'Time', accessor: 'txnDate', minWidth: 50},
        {Header: 'Txn#', accessor: 'txnNum', minWidth: 50},
        {Header: 'Unit', accessor: 'quantity', minWidth: 40},
        {Header: (this.props.currency === null ? '' : this.props.currency) + '$', accessor: 'value', minWidth: 50, sortMethod: (a,b) => {
            return parseFloat(a.replace(",","")) - parseFloat(b.replace(",",""));
        }}
    ];

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.props.date !== nextProps.data;
    }

    render() {
        let formattedData;
        if (typeof this.props.data !== "undefined") {
            formattedData = aggregateData(this.props.data);
        }

        return (
            <div className="flex flex-column items-center vh-75 w-100">
                <p className="b sans-serif mid-gray">{typeof this.props.bizDate === "undefined" ? NOW_DATE_FORMATTED() : FORMAT_DATE_LOCALE(this.props.bizDate)} :
                    Sales Transactions</p>
                {typeof this.props.data !== "undefined" &&
                <div className="flex flex-column items-center w-100 pb4 sans-serif">
                    <ReactTable columns={this.headersL1} data={formattedData}
                                defaultPageSize={formattedData.length > 10 ? 10 : formattedData.length}
                                className="w-90 pb2 f5 mid-gray" showPageJump={false}
                                showPagination={formattedData.length > 10}
                                column={{...ReactTableDefaults.column, headerClassName: "b"}}
                                SubComponent={row => {
                                    return (
                                        <div className="ma2">
                                            <SalesLineItemsTable data={row.original.lines}/>
                                        </div>
                                    );
                                }}
                    />
                </div>
                }
            </div>
        )
    }
}

export default SalesTransactionsTab;