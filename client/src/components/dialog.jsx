import React, { Component } from 'react';
import api from '../globalConst';
import { withRouter } from 'react-router';

class dialog extends Component {
    addRole = (event) => {
        var role=event.target.name;
        console.log('addRole');
        let userDetails = {
            userId: localStorage.getItem('userId'),
            role: event.target.name
        }
        fetch(api + "/addRole", {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify(userDetails)
        }).then((res) => {
            res.json().then((data) => {
                console.log('data ', data);
                if(localStorage.getItem('redFrom')!=="facebook"){
                    if(data.isRollAdded){
                alert('Successfully Registered Now you can login');
                localStorage.clear();
                this.props.history.push('/');
                }else{
                    alert(data.Error);
                }}
                else{
                    if(role==='Customer'){
                        localStorage.setItem('routes',['/customer','/']);
                        this.props.history.push('/customer');
                    }else{
                        localStorage.setItem('routes',['/lender','/'])
                        this.props.history.push('/lender');
                    }
                }
            })
        })
    }
    componentDidMount() {
        const values = this.props.match.params;
        console.log(values.userId);
        console.log(values.sessionId);
        localStorage.setItem("sessionId", values.sessionId);
        localStorage.setItem('userId', values.userId);
        localStorage.setItem('redFrom',values.redFrom);
    }
    render() {

        return (
            <React.Fragment>
                <span>What type of Role you want?</span>
                <button className="btn btn-primary" onClick={this.addRole} name="Customer">Customer</button>
                <button className="btn btn-success" onClick={this.addRole} name="Lender">Lender</button>
            </React.Fragment>
        )
    }
}
export default withRouter(dialog);