import React, {Component} from 'react';

class SalesLineItemsTable extends Component {

    lineRows = (data) => {
        let items = [];
        data.forEach(line => items.push(this.lineRow(line)));
        return items;
    };

    lineRow = (line) => {
        const {category, itemId, itemName, quantity, unit_value, value} = line;

        return (
            <div className="flex justify-around items-center h3 bg-washed-blue bt bb b--light-gray" key={itemId + quantity}>
                <div className="flex flex-column items-start w-70 ph2">
                    <span className="f5 b">{itemName}</span>
                    <span className="f6">{"$" + unit_value}</span>
                </div>
                <div className="flex flex-column items-center w-30">
                    <span className="f6 b">{quantity}</span>
                    <span className="f6 bg-mid-gray br3 white b ph1 pv1 w3">{"$" + value}</span>
                </div>
            </div>
        );
    };

    render() {
        return (
            <div>
                {this.lineRows(this.props.data)}
            </div>
        );
    }
}

export default SalesLineItemsTable;
