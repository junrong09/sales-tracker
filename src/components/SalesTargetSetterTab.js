import React, {Component} from 'react';
import FormTextBox from "./FormTextBox";
import FormButton from "./FormButton";
import LocalStorage from "./LocalStorage";
import leftArrow from "../img/left-arrow.png";
import rightArrow from "../img/right-arrow.png";
import {toastError, toastSuccess, toastWarning} from "./Toast";
import {POST_TARGET} from "./Constant";

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

        if (isNaN(this.state.newTarget) || this.state.newTarget === '') {
            toastWarning("invalidInput", "⚠️ Invalid Input");
            return;
        }

        fetch(POST_TARGET(), {
            method: 'post', headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({id: this.props.id,
                target: parseFloat(this.state.newTarget)
            , datetime: this.state.date.toISOString()})})
            .then(res  => res.json())
            .then(res => {
                console.log(res);
                LocalStorage.saveTarget(this.props.id, this.state.date, this.state.newTarget);
                this.setState({curTarget: this.state.newTarget});
                toastSuccess("setTarget", "✔️ Target Submitted");
            })
            .catch((err) => {
                toastError("fetch", "❌ No connection found");
                console.log(err);
            });
    };

    render() {

        return (
            <div className="flex flex-column items-center vh-75 w-100">
                <div className="flex justify-around items-center w-100 mt2">
                    <input type="image" alt="Prev day navigator" src={leftArrow} className={"h2 w2 drop-shadow " + (this.state.date.toDateString() === new Date().toDateString() ? "" : "hidden")} onClick={() => this.onDateChange(-1)}/>
                    <span className="b sans-serif mid-gray">Target for {this.state.date.toLocaleDateString('en-US', {day: "numeric", month: "short", year: "numeric"})}</span>
                    <input type="image" alt="Next day navigator" src={rightArrow} className={"h2 w2 drop-shadow " + (this.state.date.toDateString() === new Date().toDateString() ? "hidden" : "")}
                           onClick={() => this.onDateChange(1)}/>
                </div>
                <p>Current Target: {this.state.curTarget === null ? 0 : this.state.curTarget}</p>
                <div className="flex flex-column w-90 mw6 pv4 ph3 br2 shadow-3">
                    <FormTextBox label="Target" onChange={this.onTargetChange}/>
                    <FormButton label="Submit" onClick={this.onTargetSubmit}/>
                </div>
            </div>
        );
    }
}

export default SalesTargetSetterTab;