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
import {FORMAT_DATE, GET_TXN} from "./components/Constant";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: LocalStorage.getID(),
            bizDate: undefined,
            transactions: undefined
        }
    }

    onIdChange = (value) => {
        this.setState({id:value});
        LocalStorage.saveID(value);
    };
    onTransactionsFetchID = (id) => {
        fetch(GET_TXN(id), {
            method: 'get'
        })
            .then(response => response.json())
            .then(json => json.txn)
            .then(transactions => {
                this.setState({transactions: transactions});
                console.log("Fetch successful: " + transactions.length + " trans");
                console.log(transactions);
            })
            .catch(err => {
                toastError("fetch", "❌ No connection found");
                console.log(err);
            });
    };
    onTransactionsFetch = () => this.onTransactionsFetchID(this.state.id);
    onLogout = () => {
        LocalStorage.removeID();
        this.setState({id: '', transactions: undefined});
    };

    render() {
        return (
            <div className="App flex flex-column">

                <header className="flex justify-center items-center h3 shadow-2">
                    <img src={logo} alt="DFS" className="w2 h2 mh2 mh3-ns"/>
                    <h1 className="f3 f2-ns fw7 mv0 sans-serif mid-gray">Sales Tracker</h1>
                </header>

                <main className="flex flex-column items-center">
                    {
                        this.state.id === '' || /\s/.test(this.state.id) ?
                            // Non-user
                            <React.Fragment>
                                <Login onIdChange={this.onIdChange}
                                       onTransactionsFetch={this.onTransactionsFetchID}/>
                                <Redirect to="/"/>
                            </React.Fragment>:
                            // User (logged in)
                            <React.Fragment>
                                <NavigationBar id={this.state.id} onLogout={this.onLogout}/>
                                <Switch>
                                    <Route path='/sales' render={() => <SalesTracker id={this.state.id} transactions={this.state.transactions} onTransactionsFetch={this.onTransactionsFetch} bizDate={this.state.bizDate}/>}/>
                                    <Route render={() => <Redirect to="/sales"/>}/>
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
