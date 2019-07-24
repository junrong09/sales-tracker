import React from 'react';
import FormTextBox from "./FormTextBox";
import FormButton from "./FormButton";
import {Link} from "react-router-dom";
import {toastWarning} from "./Toast";
import {GET_URL, KAFKA_URL, SERVEO_URL, SET_URL, storeOptions} from "./Constant";
import FormDropDown from "./FormDropDown";
import Popup from "reactjs-popup";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tempId: '',
            tempStoreId: storeOptions.entries().next().value[1][0],
            tempAPI: GET_URL()
        }
    }

    onTempIdChange = (event) => this.setState({tempId:event.target.value});
    onTempStoreIdChange = (event) => {
        this.setState({tempStoreId:storeOptions.get(event.target.selectedOptions[0].value)[0]});
    };
    onApiChange = () => {
        let newValue = prompt("Please enter API", GET_URL());
        console.log(newValue);
        if (newValue !== null)
            SET_URL(newValue);
    };
    onTempApiChange = (event) => this.onTempApiTextChange(event.target.value);
    onTempApiTextChange = (text) => this.setState({tempAPI: text});
    onTempApiSave = () => SET_URL(this.state.tempAPI);

    render() {
        return (
                <div className="flex flex-column w-90 mw6 mv5 mv6-ns pv4 ph3 br2 shadow-3">
                    <span className="f4 f3-ns fw5 mb3 sans-serif mid-gray">Login</span>
                    <FormTextBox label="Employee ID" onChange={this.onTempIdChange}/>
                    <FormDropDown label="Store" options={storeOptions} onChange={this.onTempStoreIdChange}/>
                    <Link to="/sales">
                    <FormButton label="Next" onClick={() => {
                        if (this.state.tempId === '' || /\s/.test(this.state.tempId)) {
                            toastWarning("invalidLogin", "⚠️ Invalid id");
                        } else {
                            this.props.onIdChange(this.state.tempId);
                            this.props.onStoreIdChange(this.state.tempStoreId);
                        }
                    }}/>
                    </Link>
                    <Popup modal
                        trigger={<input className="f3 self-end bg-white b--none" type="button" value="⚙️"/>}>
                        {close => (
                            <div className="flex flex-column content-center shadow-3">
                                <FormTextBox label="API" onChange={this.onTempApiChange} defaultText={this.state.tempAPI}/>
                                <div className="flex flex-wrap justify-center">
                                    <FormButton label="x-sin" onClick={() => this.onTempApiTextChange(KAFKA_URL)}/>
                                    <FormButton label="Serveo" onClick={() => this.onTempApiTextChange(SERVEO_URL)}/>
                                    <FormButton label="Save" onClick={() => {
                                        this.onTempApiSave();
                                        close();
                                    }}/>
                                    <FormButton label="Close" onClick={() => {
                                        this.setState({tempAPI: GET_URL()});
                                        close();
                                    }}/>
                                </div>
                            </div>
                        )}
                    </Popup>
                </div>
        )
    }
}

export default Login;