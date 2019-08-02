import React from "react";
import FormButton from "./FormButton";
import {Link} from "react-router-dom";

class NavigationBar extends React.Component {
    render() {
        return (
            <div className="flex items-center w-100 ph3 justify-between justify-end-ns">
                <p className="sans-serif mid-gray b mr3">Welcome, {this.props.userName === null ? this.props.id : this.props.userName}</p>
                <Link to="/">
                    <FormButton label="Logout" onClick={this.props.onLogout}/>
                </Link>
            </div>
        )
    }
}

export default NavigationBar;