import React, {Component, Fragment} from 'react';
import FormTextBox from "./FormTextBox";
import FormButton from "./FormButton";

class SalesTargetSetterTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newTarget: '',
        }
    }

    onTargetChange = (event) => this.setState({newTarget: event.target.value});
    onTargetSubmit = () => {
        if (isNaN(this.state.newTarget)) {
            alert("Invalid input");
            return;
        }

        fetch("http://localhost:8080/settarget", {
            method: 'post', headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({id: this.props.data.id, target: parseFloat(this.state.newTarget)})})
            .then(res  => res.json())
            .then(res => {
                if (res === true) {
                    this.props.fetchUserProfile();
                    alert("New target saved");
                }
                else
                    alert("Please try again");
            })
            .catch((err) => {
                console.log(err);
                alert("Error Caught");
            });
    };

    render() {
        return (
            <Fragment>
                <p className="b sans-serif mid-gray">Target Setter for 10 Aug 2018</p>
                <p>Current Target: {this.props.data.target}</p>
                <div className="flex flex-column w-90 mw6 pv4 ph3 br2 shadow-3">
                <FormTextBox label="Target" onChange={this.onTargetChange}/>
                <FormButton label="Save" onClick={this.onTargetSubmit}/>
                </div>
            </Fragment>
        );
    }
}

export default SalesTargetSetterTab;