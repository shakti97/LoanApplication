import React, { Component } from 'react';
import './App.css';
import {Switch,Route} from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import AdminPanel from "./components/admin";
import Customer from "./components/customer";
import Lender from "./components/lender";
import dialog from './components/dialog';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="jumbotron">
          <h1>Loan Application</h1>
        </header>
        <Switch>
          <Route path='/' exact component={Login}/>
          <Route path='/dialog/:redFrom/:userId/:sessionId' exact component={dialog}/>
          <Route path='/signUp' exact component={SignUp}/>
          <Route path="/admin" exact component={AdminPanel}/>
          <Route path="/lender" exact component={Lender}/>
          <Route path="/customer" exact component={Customer}/>
        </Switch>
      </div>
    );
  }
}

export default App;
