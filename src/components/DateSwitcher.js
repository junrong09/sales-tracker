import React, {Component} from 'react';
import leftArrow from "../img/left-arrow.png";
import {FORMAT_DATE, FORMAT_DATE_LOCALE} from "./Constant";
import rightArrow from "../img/right-arrow.png";

class DateSwitcher extends Component {

    render() {
        return (
            <div className="flex justify-around items-center w-100 mt2">
                <input type="image" alt="Prev day navigator" src={leftArrow} className={"h2 w2 drop-shadow " + (FORMAT_DATE(this.props.date).toDateString() === new Date().toDateString() ? "" : "hidden")} onClick={() => this.props.onDateChange(-1)}/>
                <span className="b sans-serif mid-gray">Target for {FORMAT_DATE_LOCALE(this.props.date)}</span>
                <input type="image" alt="Next day navigator" src={rightArrow} className={"h2 w2 drop-shadow " + (FORMAT_DATE(this.props.date).toDateString() === new Date().toDateString() ? "hidden" : "")}
                       onClick={() => this.props.onDateChange(1)}/>
            </div>
        );
    }
}

export default DateSwitcher;