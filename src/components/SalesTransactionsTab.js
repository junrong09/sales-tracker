import React from "react";
import ReactTable, {ReactTableDefaults} from 'react-table'
import 'react-table/react-table.css'
import {aggregateData} from "../classes/Transaction";
import {FORMAT_DATE_LOCALE, NOW_DATE_FORMATTED} from "./Constant";

class SalesTransactionsTab extends React.Component {
    headersL1 = [
        {
            Header: 'Header',
            columns: [{Header: 'Time', accessor: 'txnDate', minWidth: 50}, {
                Header: 'ID',
                accessor: 'txnNum',
                minWidth: 50
            }]
        },
        {
            Header: 'Sales',
            columns: [{Header: 'Qty', accessor: 'quantity', minWidth: 40}, {
                Header: 'Value',
                accessor: 'value',
                minWidth: 50
            }]
        }];

    headersL2 = [
        {Header: 'Item ID', accessor: 'itemId', minWidth: 40}, {
            Header: 'Item Name',
            accessor: 'itemName',
            minWidth: 50
        }, {Header: 'Category', accessor: 'category', minWidth: 50}, {
            Header: 'Unit Value',
            accessor: 'unit_value',
            minWidth: 40
        }, {Header: 'Qty', accessor: 'quantity', minWidth: 30}, {Header: 'Value', accessor: 'value', minWidth: 40}
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
                <p className="b sans-serif mid-gray">{typeof this.props.bizDate === "undefined" ? NOW_DATE_FORMATTED() : FORMAT_DATE_LOCALE(this.props.bizDate)} : Sales Transactions</p>
                {typeof this.props.data !== "undefined" &&
                <div className="flex flex-column items-center w-100 pb4">
                    <ReactTable columns={this.headersL1} data={formattedData} defaultPageSize={formattedData.length > 10 ? 10 : formattedData.length}
                                className="w-90 pb2 f5 mid-gray" showPageJump={false}
                                showPagination={formattedData.length > 10}
                                column={{...ReactTableDefaults.column, headerClassName: "b"}}
                                SubComponent={row => {
                                    return (
                                        <div className="ph2 pv3">
                                            <ReactTable columns={this.headersL2} data={row.original.lines}
                                                        defaultPageSize={row.original.lines.length > 5 ? 5 : row.original.lines.length}
                                                        column={{...ReactTableDefaults.column, headerClassName: "b" , className: "bg-washed-blue"}}
                                                        showPageJump={false} showPageSizeOptions={false}
                                                        showPagination={row.original.lines.length > 5} className="f7"/>
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