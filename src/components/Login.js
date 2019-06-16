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

    onUserVerify = () => {
        fetch("http://localhost:8080/verify?user=" + this.state.tempId, {
            method: 'get'
        })
            .then(response => response.json())
            .then(user => {
                if (user.validity === true) {
                    this.props.onIdChange(user.id);
                    console.log("USER LOGIN SUCCESS");
                } else {
                    console.log("USER LOGIN NOT FOUND");
                }
            })
            .catch(console.log);
    };

    render() {
        return (
                <div className="flex flex-column w-90 mw6 mv5 mv6-ns pv4 ph3 br2 shadow-3">
                    <span className="f4 f3-ns fw5 mb3 sans-serif mid-gray">Login</span>
                    <FormTextBox label="Employee ID" onChange={this.onTempIdChange}/>
                    {/*<FormTextBox label="Name"/>*/}
                    <Link to="/sales">
                    <FormButton label="Next" onUserVerify={this.onUserVerify}/>
                    </Link>
                </div>
        )
    }
}

export default Login;