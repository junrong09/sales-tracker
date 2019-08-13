import React, {Component} from 'react';
import FormButton from "./FormButton";
import FormTextField from "./FormTextField";
import {POST_FEEDBACK} from "./Constant";
import {toastError, toastSuccess} from "./Toast";
import Rating from "react-rating";
import starFilled from "../img/star-filled.png";
import starUnfilled from "../img/star-unfilled.png";
import LocalStorage from "./LocalStorage";


class FeedbackTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: '',
            ratings: 1
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
                if (res.status === 201) {
                    this.setState({comments: '', ratings: 1});
                    LocalStorage.removeComments();
                    LocalStorage.removeRatings();
                    toastSuccess("feedbackSummitted", "✔️ Feedback Submitted");
                }
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

    componentDidMount() {
        this.setState({comments: LocalStorage.getComments(), ratings: LocalStorage.getRatings()});
    }

    componentWillUnmount() {
        if (this.state.comments === '')
            LocalStorage.removeComments();
        else
            LocalStorage.saveComments(this.state.comments);

        if (this.state.ratings === 1)
            LocalStorage.removeRatings();
        else
            LocalStorage.saveRatings(this.state.ratings);
    }

    render() {
        return (
            <div className="flex flex-column items-center vh-75 w-100">
                <p className="b sans-serif mid-gray">How is Our App?</p>
                <div className="flex flex-column w-90 mw6 pv4 ph3 br2 shadow-3">
                    <Rating  onChange={this.onRatingsChange} initialRating={this.state.ratings}
                             fullSymbol={<img src={starFilled} alt="filled star" className="h2"/>} emptySymbol={<img src={starUnfilled} alt="unfilled star" className="h2"/>} className="mb3" />
                    <FormTextField label="Comment" onChange={this.onCommentsChange}
                                   value={this.state.comments} placeholder="Add your comment (optional)"/>
                    <FormButton label="Submit" onClick={this.onSubmit}/>
                </div>
            </div>
        );
    }
}

export default FeedbackTab;