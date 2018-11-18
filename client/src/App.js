import React, { Component } from 'react';
import './App.css';
import {Switch,Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Loan Application
        </header>
        <Switch>
          <Route path='/' exact component={Login}/>
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
