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
            newTarget: '',
            date: new Date()
        }
    }

    onTargetChange = (event) => this.setState({newTarget: event.target.value});
    onDateChange = (days) => {
        let d = new Date(this.state.date);
        d.setDate(this.state.date.getDate() + days);

        let today = new Date();
        let yest = new Date();
        yest.setDate(yest.getDate() - 1);

        if (d.toDateString() === today.toDateString() || d.toDateString() === yest.toDateString()) {
            this.setState({curTarget: LocalStorage.getTarget(this.props.id, d)});
            this.setState({date: d});
        }
    };

    onTargetSubmit = () => {
        if (isNaN(this.state.newTarget)) {
            alert("Invalid input");
            return;
        }

        fetch(HOST + "target", {
            method: 'post', headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({id: this.props.id,
                target: parseFloat(this.state.newTarget)
            , datetime: this.state.date.toISOString()})})
            .then(res  => res.json())
            .then(res => {
                console.log(res);
                LocalStorage.saveTarget(this.props.id, this.state.date, this.state.newTarget);
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
                <div className="flex justify-around w-100">
                    <input type="button" value="⮜" className={"f2 b--none bg-white blue " + (this.state.date.toDateString() === new Date().toDateString() ? "" : "hidden")} onClick={() => this.onDateChange(-1)}/>
                    <p className="b sans-serif mid-gray">Target for {this.state.date.toLocaleDateString('en-US', {day: "numeric", month: "short", year: "numeric"})}</p>
                    <input type="button" value="⮞" className={"f2 b--none bg-white blue " + (this.state.date.toDateString() === new Date().toDateString() ? "hidden" : "")}
                           onClick={() => this.onDateChange(1)}/>
                </div>
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