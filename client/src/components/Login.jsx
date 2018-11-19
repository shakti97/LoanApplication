import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import api from '../globalConst';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { email: "", password: "" }
    }
    handleChange = (event) => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value }, () => { console.log(this.state) });

    }
    Login = (event) => {
        event.preventDefault();
        console.log('login');
        let userDetails = this.state;
        fetch(api + '/login', {
            headers: { 'Content-Type': 'application/json'},
            method: "POST",
            body: JSON.stringify(userDetails),
            credentials: 'include'
        }).then((res) => {
            res.json().then((data) => {
                if(data.isLogin){
                console.log(data);
                localStorage.setItem("sessionId", data.sessionId);
                localStorage.setItem('userId', data.userId);
                localStorage.setItem('routes',data.routes);
                if (data.role === 'Customer') {
                    this.props.history.push('/customer');
                } else if (data.role === "Lender") {
                    this.props.history.push('/lender');
                }
                else if(data.role==='Admin'){
                    this.props.history.push('/admin');
                }
            }
            else if(data.Invalid){
                alert('Id or Password is Invalid');
            }
        })
        }).catch((res) => {
            console.log('error while fetching ', res);
        })
    }
    loginWithFb=()=>{
        console.log('login with fb ');
        fetch(api+'/auth/facebook',{

        }).then((res)=>{
            res.json().then((data)=>{
                console.log('data ',data);
            })
        }).catch((res)=>{
            console.log('error in fb login ');
        })
    }
    componentWillMount(){
        localStorage.setItem('routes',[]);
    }
    render() {
        return (
            <div className="log-form">
                <form onSubmit={this.Login}>
                    <div className="imgcontainer">
                        <img src="https://banner2.kisspng.com/20180425/zye/kisspng-computer-icons-avatar-user-login-5ae149b20c8348.1680096815247139060513.jpg" alt="Avatar" className="avatar" />
                    </div>

                    <div className="container">
                        <label ><b>Email</b></label>
                        <input type="text" placeholder="Enter Email" name="email" onChange={this.handleChange} required />

                        <label ><b>Password</b></label>
                        <input type="password" placeholder="Enter Password" name="password" onChange={this.handleChange} required />

                        <button type='submit' >Login</button>

                    </div>

                    <div className="container" style={{ "backgroundColor": "#f1f1f1" }}>
                        <Link to='/signUp'><span className="btn btn-warning">Sign Up</span></Link>
                        <a href={api+'/auth/facebook'}><span className='btn btn-primary'>  Login With Facebook</span></a>
                    </div>
                </form>

            </div>
        )
    }
}
export default Login;