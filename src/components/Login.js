import React from 'react';
import FormTextBox from "./FormTextBox";
import FormButton from "./FormButton";
import {Link} from "react-router-dom";
import {toastWarning} from "./Toast";
import {
    API_DFS_URL,
    DEV_API_DFS_URL,
    ESB_DFS_URL,
    GET_URL,
    KAFKA_URL, MOCK_URL,
    SET_URL,
    STAGING_API_DFS_URL,
    storeOptions
} from "./Constant";
import Popup from "reactjs-popup";
import FormNumberBox from "./FormNumberBox";
import LocalStorage from "./LocalStorage";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tempId: '',
            tempStoreId: storeOptions.entries().next().value[1][0],
            tempAPI: GET_URL()
        }
    }

    onTempIdChange = (event) => {
        if (event.target.checkValidity()) {
            this.setState({tempId: event.target.value})
        } else {
            this.setState({tempId: ''});
            toastWarning("invalidLogin", "⚠️ Invalid id");
        }
    };
    onTempStoreIdChange = (event) => {
        this.setState({tempStoreId: storeOptions.get(event.target.selectedOptions[0].value)[0]});
    };
    onTempApiChange = (event) => this.onTempApiTextChange(event.target.value);
    onTempApiTextChange = (text) => this.setState({tempAPI: text});
    onTempApiSave = () => SET_URL(this.state.tempAPI);

    componentDidMount() {
        LocalStorage.clearAllUserCache();
    }

    render() {
        return (
            <div className="flex flex-column w-90 mw6 mv5 mv6-ns pv4 ph3 br2 shadow-3">
                <span className="f4 f3-ns fw5 mb3 sans-serif mid-gray">Login</span>
                <FormNumberBox label="Employee ID" onChange={this.onTempIdChange} step="1"/>
                {/*<FormDropDown label="Store" options={storeOptions} onChange={this.onTempStoreIdChange}/>*/}
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
                <Popup modal className=""
                       trigger={<input className="w2 h2 f4 self-end bg-transparent bn grow hide" type="button" value="⚙️"/>}>
                    {close => {
                        return (
                        <div className="flex flex-column content-center">
                            <div className="flex justify-end">
                                <input type="button"
                                       className="bg-transparent bn w2 h2 br-100 b self-end hover-bg-washed-blue grow"
                                       onClick={() => {
                                           this.onTempApiSave();
                                           close();
                                       }} value="💾"/>
                                <input type="button"
                                       className="bg-transparent bn w2 h2 br-100 b self-end hover-bg-washed-blue grow"
                                       onClick={() => {
                                           this.setState({tempAPI: GET_URL()});
                                           close();
                                       }} value="❌"/>
                            </div>
                            <FormTextBox label="API" onChange={this.onTempApiChange} defaultText={this.state.tempAPI}/>
                            <div className="flex flex-wrap justify-center">
                                <FormButton label="Esbsit" className="ma1"
                                            onClick={() => this.onTempApiTextChange(KAFKA_URL)}/>
                                <FormButton label="MOCK" className="ma1"
                                            onClick={() => this.onTempApiTextChange(MOCK_URL)}/>
                                <FormButton label="ESB" className="ma1"
                                            onClick={() => this.onTempApiTextChange(ESB_DFS_URL)}/>
                                <FormButton label="DFS_API" className="ma1"
                                            onClick={() => this.onTempApiTextChange(API_DFS_URL)}/>
                                <FormButton label="DFS_DEV" className="ma1"
                                            onClick={() => this.onTempApiTextChange(DEV_API_DFS_URL)}/>
                                <FormButton label="DFS_STAGE" className="ma1"
                                            onClick={() => this.onTempApiTextChange(STAGING_API_DFS_URL)}/>
                            </div>
                        </div>
                    )}}
                </Popup>
            </div>
        )
    }
}

export default Login;