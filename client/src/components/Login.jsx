import React from 'react'
import '../App.css'

const Login = () => {
    return (<>
        <div class="Login">
            <form class="Login-card">
                <h1 class="Login-title">Login</h1>

                <input class="Login-input" type="text" id="username" name="username" placeholder="Username"> </input>
                <input class="Login-input" type="password" id="password" name="password" placeholder="Password"> </input>
                <button class="Login-button" type="submit">Login</button>

            </form>
        </div>
    </>
    )
}

export default Login