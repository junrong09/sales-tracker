import React from 'react';

class FormSelectorTextBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 'SKU'
        }
    }

    render() {
        const ranNum = Math.floor(Math.random() * 100000);
        return (
            <div className="flex mh3 mt2 mb3 w-90 h2 ba br2 b--light-gray shadow-4">
                <select name="attribute" className="f6 b mid-gray w-20 bn pl2 br2 sans-serif input-reset" onChange={(event) => {
                    this.props.onCategoryChange(event);
                    this.setState({selected: event.target.selectedOptions[0].text});
                }}>
                    <option value="itemId" selected="selected">SKU</option>
                    <option value="txnNum">TXN</option>
                </select>
                <span className="f6 mh1 sans-serif self-center">:</span>
                <input className="f6 mid-gray w-80 bn pl2 hover-bg-washed-blue sans-serif br2" type="text" id={this.state.selected + ranNum} placeholder={this.props.placeholder === undefined ? "Search " + this.state.selected + "..." : this.props.placeholder} onChange={this.props.onTextChange} defaultValue={this.props.defaultText}/>
            </div>
        )
    }

}

export default FormSelectorTextBox;