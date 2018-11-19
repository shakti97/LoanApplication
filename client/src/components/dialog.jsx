import React, { Component } from 'react';
import api from '../globalConst';
import {withRouter} from 'react-router';

class dialog extends Component{
    addRole=(event)=>{
        console.log('addRole');
        let userDetails={
            userId : localStorage.getItem('userId'),
            role :event.target.name
        }
        fetch(api+"/addRole",{
            headers: {'Content-Type': 'application/json'},
            method : "POST",
            body : JSON.stringify(userDetails)
        }).then((res)=>{
            res.json().then((data)=>{
                console.log('data ',data);
                alert('Successfully Registered Now you can login');
                localStorage.clear();
                this.props.history.push('/');
            })
        })
    }
    render(){
        return(
            <React.Fragment>
                <span>What type of Role you want?</span>
                <button className="btn btn-primary" onClick={this.addRole} name="Customer">Customer</button>
                <button className="btn btn-success" onClick={this.addRole} name="Lender">Lender</button>
            </React.Fragment>
        )
    }
}
export default withRouter(dialog);