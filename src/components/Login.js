import React from 'react';
import FormTextBox from "./FormTextBox";
import FormButton from "./FormButton";
import {Link} from "react-router-dom";
import {toastWarning} from "./Toast";
import {GET_URL, SET_URL} from "./Constant";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tempId: '',
        }
    }

    onTempIdChange = (event) => this.setState({tempId:event.target.value});
    onApiChange = () => {
        let newValue = prompt("Please enter API", GET_URL());
        console.log(newValue);
        if (newValue !== null)
            SET_URL(newValue);
    };

    render() {
        return (
                <div className="flex flex-column w-90 mw6 mv5 mv6-ns pv4 ph3 br2 shadow-3">
                    <span className="f4 f3-ns fw5 mb3 sans-serif mid-gray">Login</span>
                    <FormTextBox label="Employee ID" onChange={this.onTempIdChange}/>
                    <Link to="/sales">
                    <FormButton label="Next" onClick={() => {
                        if (this.state.tempId === '' || /\s/.test(this.state.tempId)) {
                            toastWarning("invalidLogin", "⚠️ Invalid id");
                        } else {
                            this.props.onIdChange(this.state.tempId);
                        }
                    }}/>
                    </Link>
                    <input className="f3 self-end bg-white b--none" type="button" value="⚙️" onClick={this.onApiChange}/>
                </div>
        )
    }
}

export default Login;