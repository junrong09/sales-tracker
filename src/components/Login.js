import React from 'react';
import FormTextBox from "./FormTextBox";
import FormButton from "./FormButton";
import {Link} from "react-router-dom";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tempId: '',
        }
    }

    onTempIdChange = (event) => this.setState({tempId:event.target.value});

    render() {
        return (
                <div className="flex flex-column w-90 mw6 mv5 mv6-ns pv4 ph3 br2 shadow-3">
                    <span className="f4 f3-ns fw5 mb3 sans-serif mid-gray">Login</span>
                    <FormTextBox label="Employee ID" onChange={this.onTempIdChange}/>
                    <Link to="/sales">
                    <FormButton label="Next" onClick={() => {
                        this.props.onIdChange(this.state.tempId);
                    }}/>
                    </Link>
                </div>
        )
    }
}

export default Login;