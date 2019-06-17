import React from "react";
import FormButton from "./FormButton";
import {Link} from "react-router-dom";

class NavigationBar extends React.Component {
    render() {
        return (
            <div className="flex items-center w-100 ph3 justify-between">
                <p>Welcome, {this.props.id}</p>
                <Link to="/">
                    <FormButton label="Logout" onClick={this.props.onLogout}/>
                </Link>
            </div>
        )
    }
}

export default NavigationBar;