import React from 'react';
import './App.css';
import Login from './components/Login';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            role: ''
        }
    }

    onIdChange = (id) => this.setState({id:id});
    onRoleChange = (role) => this.setState({role:role});

    render() {
        return (
            <div className="App flex flex-column">
                <link rel="stylesheet" href="https://unpkg.com/tachyons@4.10.0/css/tachyons.min.css"/>

                <header className="flex justify-center items-center h3 shadow-2">
                    <h1 className="f3 f2-ns fw7 mv0 sans-serif mid-gray">Sales Tracker</h1>
                </header>

                <main className="flex justify-center">

                    <Login/>
                </main>

                <footer className="shadow-2">Footer</footer>
            </div>
        );
    }
}

export default App;
