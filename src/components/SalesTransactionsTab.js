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
                <p className="b sans-serif mid-gray">24 Jun 2019 : Sales Transactions</p>
                {isPropDefined &&
                <Table
                    width={300}
                    height={400}
                    headerHeight={30}
                    rowHeight={25}
                    rowCount={this.props.data.length}
                    rowGetter={({index}) => this.props.data[index]}
                    className=""
                    headerClassName="mid-gray"
                    rowClassName="bb b--moon-gray"
                    gridClassName="mid-gray"
                >
                    <Column width={200} label='SKU' dataKey='sku'/>
                    <Column width={200} label='Value' dataKey='value'/>
                    <Column width={200} label='Time' dataKey='time'/>
                </Table>
                }

            </React.Fragment>
        )
    }
}

export default SalesTransactionsTab;