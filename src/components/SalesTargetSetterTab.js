import React, {Component} from 'react';
import FormTextBox from "./FormTextBox";
import FormButton from "./FormButton";
import {toastError, toastSuccess, toastWarning} from "./Toast";
import {FORMAT_DATE, FORMAT_DATE_LOCALE, FORMAT_SHORT_DATE_LOCALE, POST_TARGET, YYYYMMDD} from "./Constant";
import DateSwitcher from "./DateSwitcher";

class SalesTargetSetterTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newTarget: '',
            selectedDate: typeof this.props.bizDate === "undefined" ? YYYYMMDD(new Date()) : this.props.bizDate
        };
    }

    onTargetChange = (event) => this.setState({newTarget: event.target.value});

    onTargetSubmit = () => {
        if (isNaN(this.state.newTarget) || /\s/.test(this.state.newTarget) || this.state.newTarget === '') {
            toastWarning("invalidInput", "⚠️ Invalid Input");
            return;
        }
        this.postTarget(this.props.id, this.state.newTarget, this.state.selectedDate);
    };

    postTarget = (id, target, date) => {
        target = parseFloat(target);
        fetch(POST_TARGET(), {
            method: 'post', headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                saId: id,
                dayTarget: Math.round(target * 100) / 100, bizDate: date
            })
        })
            .then(res => res.text())
            .then(res => {
                console.log(res);
                this.props.onCurTargetChange(target);
                this.props.onTargetBizDateChange(date);
                toastSuccess("setTarget", "✔️ Target Submitted");
            })
            .catch((err) => {
                toastError("fetch", "❌ No connection found");
                console.log(err);
            });
    };

    onDateChange = (days) => {
        let d = FORMAT_DATE(this.state.selectedDate);
        d.setDate(d.getDate() + days);

        let today = new Date();
        let yest = new Date();
        yest.setDate(yest.getDate() - 1);

        if (d.toDateString() === today.toDateString() || d.toDateString() === yest.toDateString()) {
            this.setState({selectedDate: YYYYMMDD(d)});
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.bizDate !== this.props.bizDate)
            this.setState({selectedDate: typeof this.props.bizDate === "undefined" ? YYYYMMDD(new Date()) : this.props.bizDate});
    }

    render() {
        return (
            <div className="flex flex-column items-center vh-75 w-100">
                {typeof this.props.bizDate === "undefined" ?
                    <DateSwitcher onDateChange={this.onDateChange} date={this.state.selectedDate}/>
                    : <p className="b sans-serif mid-gray">Target for {FORMAT_DATE_LOCALE(this.props.bizDate)}</p>
                }
                <p>Previous Target : {this.props.curTarget} <br/>
                    {this.props.targetBizDate === '' || this.props.targetBizDate === this.state.selectedDate
                        ? ""
                        : "(Submitted for " + FORMAT_SHORT_DATE_LOCALE(this.props.targetBizDate) + ") "}
                </p>
                <div className="flex flex-column w-90 mw6 pv4 ph3 br2 shadow-3">
                    <FormTextBox label="Target" onChange={this.onTargetChange}/>
                    <FormButton label="Submit" onClick={this.onTargetSubmit}/>
                </div>
            </div>
        );
    }
}

export default SalesTargetSetterTab;