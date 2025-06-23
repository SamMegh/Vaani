import React from 'react'

const SignUp = () => {

    const handleSignUp = () => {

      // Perform sign-up logic here
    }

  return (
 <div className="Login">
        <form onSubmit={handleSignUp} className="Login-card">
            <h1 className="Login-title">Sign Up</h1>

            <input className="Login-input" type="text" id="email" name="email" placeholder="Email" />
            <input className="Login-input" type="password" id="password" name="password" placeholder="Password" />
            <button className="Login-button" type="submit">Sign Up</button>
            {/* <h3 className="highlight">Something went wrong</h3> */}
            <p><span className="highlight">Login in </span> if you have already registered </p>
        </form>

        <div className="google-login">
            <img className="google-logo" src="https://img.icons8.com/?size=100&id=110560&format=png&color=000000"
                alt="Google Logo"></img>
                
        </div>
    </div>
  )
}

export default SignUp