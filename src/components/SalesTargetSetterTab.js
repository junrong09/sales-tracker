import React, {Component, Fragment} from 'react';
import FormTextBox from "./FormTextBox";
import FormButton from "./FormButton";
import {HOST} from "./Constant";
import LocalStorage from "./LocalStorage";

class SalesTargetSetterTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curTarget: LocalStorage.getTarget(this.props.id, new Date()),
            newTarget: ''
        }
    }

    onTargetChange = (event) => this.setState({newTarget: event.target.value});

    onTargetSubmit = () => {
        if (isNaN(this.state.newTarget)) {
            alert("Invalid input");
            return;
        }

        fetch(HOST + "target", {
            method: 'post', headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({id: this.props.id,
                target: parseFloat(this.state.newTarget)
            , datetime: new Date().toLocaleString()})})
            .then(res  => res.json())
            .then(res => {
                console.log(res);
                LocalStorage.saveTarget(this.props.id, new Date(), this.state.newTarget);
                this.setState({curTarget: this.state.newTarget});
                alert("New target saved");
            })
            .catch((err) => {
                console.log(err);
                alert("Error Caught");
            });
    };

    render() {
        return (
            <Fragment>
                <p className="b sans-serif mid-gray">Target for 24 Jun 2019</p>
                <p>Current Target: {this.state.curTarget === null ? 0 : this.state.curTarget}</p>
                <div className="flex flex-column w-90 mw6 pv4 ph3 br2 shadow-3">
                <FormTextBox label="Target" onChange={this.onTargetChange}/>
                <FormButton label="Submit" onClick={this.onTargetSubmit}/>
                </div>
            </Fragment>
        );
    }
}

export default SalesTargetSetterTab;