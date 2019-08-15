import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import './App.css';
import Login from './components/Login';
import SalesTracker from "./components/SalesTracker";
import NavigationBar from "./components/NavigationBar";
import LocalStorage from "./components/LocalStorage";
import logo from "./img/logo.png";
import 'react-toastify/dist/ReactToastify.css';
import {toastComponent, toastError, toastWarning} from "./components/Toast";
import {GET_TARGET, GET_TXN, isRecentDate} from "./components/Constant";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: LocalStorage.getID(),
            storeId: '',
            bizDate: undefined,
            transactions: undefined,
            curTarget : '',
            targetBizDate: '',
            userName: null,
            currency: null
        }
    }

    onIdChange = (value) => {
        this.setState({id:value});
        LocalStorage.saveID(value);
    };
    onStoreIdChange = (value) => {
        this.setState({storeId:value});
    };
    onCurTargetChange = (value) => this.setState({curTarget: value});
    onTargetBizDateChange = (value) => this.setState({targetBizDate: value});

    onFetch = () => {
        this.onTransactionsFetchID(this.state.id);
        this.onTargetFetchID(this.state.id);
    };
    onTransactionsFetchID = (id) => {
        fetch(GET_TXN(id), {
            method: 'get'
        })
            .then(response => response.text())
            .then(text => {
                if (text === "No associated sales found for the day!" || !isRecentDate(JSON.parse(text).bizDate)) {
                    toastWarning("fetch", "⚠️ No sales for the day");
                    this.setState({bizDate : undefined});
                    return [];
                } else {
                    let json = JSON.parse(text);
                    this.setState({bizDate : json.bizDate});
                    this.setState({userName: json.employeeName});
                    this.setState({currency: json.currency});
                    return json.txn;
                }
            })
            .then(transactions => {
                this.setState({transactions: transactions});
                console.log("Fetch successful: " + transactions.length + " trans");
            })
            .catch(err => {
                toastError("fetch", "❌ No connection found");
                console.log(err);
            });
    };
    onTargetFetchID = (id) => {
        fetch(GET_TARGET(id))
            .then(res => res.text())
            .then(text => {
                if (text === "Sales target tot set!")
                    this.setState({curTarget: "~"});
                else {
                    let json = JSON.parse(text);
                    this.setState({curTarget: json.dayTarget, targetBizDate: json.bizDate});
                }
            })
    };
    onLogout = () => {
        this.setState({
            id: '', bizDate: undefined, transactions: undefined, curTarget : '', targetBizDate: ''
        });
    };

    render() {
        return (
            <div className="App flex flex-column">

                <header className="flex justify-center items-center h3 shadow-2">
                    <img src={logo} alt="DFS" className="w2 h2 mh2 mh3-ns"/>
                    <h1 className="f3 f2-ns fw7 mv0 sans-serif mid-gray">Sales Tracker</h1>
                    <p className="bg-DFS-red white i b f7 br2 pa1 sans-serif absolute right-1 banner-rotation">BETA<br/>v1.07</p>
                </header>

                <main className="flex flex-column items-center">
                    {
                        this.state.id === '' || /\s/.test(this.state.id) ?
                            // Non-user
                            <React.Fragment>
                                <Login onIdChange={this.onIdChange} onStoreIdChange={this.onStoreIdChange}
                                       onTransactionsFetch={this.onTransactionsFetchID}/>
                                <Redirect to="/sales-tracker/"/>
                            </React.Fragment> :
                            // User (logged in)
                            <React.Fragment>
                                <NavigationBar id={this.state.id} userName={this.state.userName} onLogout={this.onLogout}/>
                                <Switch>
                                    <Route path={'/sales-tracker/sales'} render={() => <SalesTracker id={this.state.id} transactions={this.state.transactions} currency={this.state.currency} curTarget={this.state.curTarget} onFetch={this.onFetch} bizDate={this.state.bizDate} targetBizDate={this.state.targetBizDate} onCurTargetChange={this.onCurTargetChange} onTargetBizDateChange={this.onTargetBizDateChange}/>}/>
                                    <Route render={() => <Redirect to="/sales-tracker/sales"/>}/>
                                </Switch>
                            </React.Fragment>
                    }

                </main>

                {/*<footer className="shadow-2">Footer</footer>*/}
                {toastComponent}
            </div>
        );
    }
}

export default App;
