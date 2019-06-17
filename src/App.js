import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import './App.css';
import Login from './components/Login';
import SalesTracker from "./components/SalesTracker";
import NavigationBar from "./components/NavigationBar";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // id: '',
            // TODO: TEMP FOR DEV
            id: 'sales1122',
            role: ''
        }
    }

    onIdChange = (value) => this.setState({id:value});
    onRoleChange = (value) => this.setState({role:value});
    onLogout = () => this.setState({id:'', role:''});

    render() {
        return (
            <div className="App flex flex-column">

                <header className="flex justify-center items-center h3 shadow-2">
                    <h1 className="f3 f2-ns fw7 mv0 sans-serif mid-gray">Sales Tracker</h1>

                </header>

                <main className="flex flex-column items-center">
                    {
                        this.state.id === '' ?
                            // Non-user
                            <React.Fragment>
                                <Login onIdChange={this.onIdChange} onRoleChange={this.onRoleChange}/>
                                <Redirect to="/"/>
                            </React.Fragment>:
                            // User (logged in)
                            <React.Fragment>
                                <NavigationBar id={this.state.id} onLogout={this.onLogout}/>
                                <Switch>
                                    <Route path='/sales' render={() => <SalesTracker id={this.state.id}/>}/>
                                    <Route render={() => <Redirect to="/sales"/>}/>
                                </Switch>
                            </React.Fragment>
                    }

                </main>

                {/*<footer className="shadow-2">Footer</footer>*/}
            </div>
        );
    }
}

export default App;
