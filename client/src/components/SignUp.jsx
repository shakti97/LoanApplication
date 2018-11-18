import React, { Component } from 'react';

class Login {
    render() {
        return (
            <div class="log-form">
                <h2>Login to your account</h2>
                <form >
                    <div class="imgcontainer">
                        <img src="img_avatar2.png" alt="Avatar" class="avatar" />
                    </div>

                    <div class="container">
                        <label for="uname"><b>Username</b></label>
                        <input type="text" placeholder="Enter Username" name="uname" required />

                        <label for="psw"><b>Password</b></label>
                        <input type="password" placeholder="Enter Password" name="psw" required />

                        <button type="submit" >Sign Up</button>
                        
                    </div>
                </form>
            </div>
        )
    }
}