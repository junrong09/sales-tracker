import React from 'react';
import FormTextBox from "./FormTextBox";
import FormButton from "./FormButton";

class Login extends React.Component {

    render() {
        return (
            //<div className="">
                <div className="flex flex-column w-90 mw6 mv5 mv6-ns pv4 ph3 br2 shadow-3">
                    <span className="f4 f3-ns fw5 mb3 sans-serif mid-gray">Login</span>
                    <FormTextBox label="Employee ID" onChange={this.onIdChange}/>
                    {/*<FormTextBox label="Name"/>*/}
                    <FormButton label="Next"/>
                </div>
            //</div>
        )
    }
}

export default Login;