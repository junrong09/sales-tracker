import React, {Component} from 'react';
import FormButton from "./FormButton";
import FormTextField from "./FormTextField";
import {POST_FEEDBACK} from "./Constant";
import {toastError, toastSuccess} from "./Toast";
import Rating from "react-rating";

class FeedbackTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: '',
            ratings: 0
        };
    }

    onCommentsChange = (event) => this.setState({comments: event.target.value});
    onRatingsChange = (ratings) => {
        console.log(ratings);
        this.setState({ratings: ratings})
    };
    onSubmit = () => {
        // Write to google sheet API
        console.log(this.state.comments);
        fetch(POST_FEEDBACK(), {
            method: 'post', headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({data: [{id: this.props.id, ratings: this.state.ratings,
                    comments: this.state.comments, dateTime: Date(Date.now()).toString()}]})
        })
            .then(res => {
                if (res.status === 201)
                    toastSuccess("feedbackSummitted", "✔️ Feedback Submitted");
                else
                    toastError("postSheet", "❌ Bad Request to sheetdb.io");
                return res.text();
            })
            .then(console.log)
            .catch(err => {
                console.log(err);
                toastError("postSheet", "❌ No connection to sheetdb.io found");
            });
    };

    render() {
        return (
            <div className="flex flex-column items-center vh-75 w-100">
                <p className="b sans-serif mid-gray">Feedback Dropbox</p>
                <div className="flex flex-column w-90 mw6 pv4 ph3 br2 shadow-3">
                    <Rating  onClick={this.onRatingsChange} onHover={this.onRatingsChange} fullSymbol="fa fa-star fa-2x" emptySymbol="far fa-star fa-2x" className="yellow mb3"/>
                    <FormTextField label="Comments" onChange={this.onCommentsChange}/>
                    <FormButton label="Submit" onClick={this.onSubmit}/>
                </div>
            </div>
        );
    }
}

export default FeedbackTab;