import React, { Component } from 'react';
import api from '../globalConst';
import {withRouter} from 'react-router';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: ""
        }
    }
    handleChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        }, () => {
            console.log(this.state)
        });

    }
    signUp = (event) => {
        event.preventDefault();
        console.log('login', api);
        let userDetails = this.state;
        console.log("userDetails ",userDetails);
        fetch(api + '/signUp', {
        headers: {'Content-Type': 'application/json'},
            method: 'POST',
            body: JSON.stringify(userDetails)
        }).then((res) => {
            console.log("res", res);
            res.json().then((data) => {
                console.log("data", data);
                if(data && data.isSignUp===true){
                    console.log('signUp true');
                    localStorage.setItem('userId',data.userId);
                    this.props.history.push('/dialog');
                }
            })
        }).catch((err) => {
            console.log(err);
        })


    }
    render() {
        return (
            <div className="log-form">
                <form onSubmit={this.signUp} >
                    <div className="imgcontainer">
                        <img src="https://banner2.kisspng.com/20180425/zye/kisspng-computer-icons-avatar-user-login-5ae149b20c8348.1680096815247139060513.jpg" alt="Avatar" className="avatar" />
                    </div>

                    <div className="container">
                        <label ><b>Username</b></label>
                        <input type="text" placeholder="Enter Username" name="username" onChange={this.handleChange} required />
                        <label ><b>Email</b></label>
                        <input type="text" placeholder="Enter Email" name="email" onChange={this.handleChange} required />
                        <label ><b>Password</b></label>
                        <input type="password" placeholder="Enter Password" name="password" onChange={this.handleChange} required />
                        <button type="submit" >Sign Up</button>

                    </div>
                </form>
            </div>
        )
    }
}
export default withRouter(SignUp);