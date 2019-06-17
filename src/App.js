import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import './App.css';
import Login from './components/Login';
import SalesTracker from "./components/SalesTracker";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            role: ''
        }
    }

    onIdChange = (value) => this.setState({id:value});
    onRoleChange = (value) => this.setState({role:value});

    render() {
        return (
            <div className="App flex flex-column">

                <header className="flex justify-center items-center h3 shadow-2">
                    <h1 className="f3 f2-ns fw7 mv0 sans-serif mid-gray">Sales Tracker</h1>

                </header>

                <main className="flex justify-center">
                    <Switch>
                        <Route path='/sales' render={() => <SalesTracker id={this.state.id}/>}/>
                        <Route render={() => {
                            if (this.state.id === '')
                                return <Login onIdChange={this.onIdChange} onRoleChange={this.onRoleChange}/>;
                            else
                                return <Redirect to="/sales"/>
                        }}/>
                    </Switch>
                </main>

                {/*<footer className="shadow-2">Footer</footer>*/}
            </div>
        );
    }
}

export default App;
