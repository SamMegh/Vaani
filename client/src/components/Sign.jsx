import React from 'react'

const Sign = () => {
  return (
    <div class="Login">
            <form class="Login-card">
                <h1 class="Login-title">Sign Up</h1>

                <input class="Login-input" type="text" id="username" name="username" placeholder="Username"> </input>
                <input class="Login-input" type="password" id="password" name="password" placeholder="Password"> </input>
                <button class="Login-button" type="submit">Sign Up</button>

            </form>
        </div>
  )
}

export default Sign