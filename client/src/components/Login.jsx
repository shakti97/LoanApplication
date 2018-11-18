import React, { Component } from 'react';

class Login {
    render() {
        return (
            <div className="log-form">
                <h2>Login to your account</h2>
                <form >
                    <div className="imgcontainer">
                        <img src="img_avatar2.png" alt="Avatar" className="avatar" />
                    </div>

                    <div className="container">
                        <label for="uname"><b>Username</b></label>
                        <input type="text" placeholder="Enter Username" name="uname" required />

                        <label for="psw"><b>Password</b></label>
                        <input type="password" placeholder="Enter Password" name="psw" required />

                        <button type="submit">Login</button>
                        
                    </div>

                    <div className="container" style="background-color:#f1f1f1">
                        <Link to='/signUp'><button type="button" className="cancelbtn">Sign Up</button></Link>

                        
                    </div>
                </form>
                <button className='btn btn-primary'>Login With Facebook</button>
            </div> 
        )
    }
}