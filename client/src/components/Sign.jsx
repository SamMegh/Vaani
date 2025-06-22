
import '../App.css'

const Sign = () => {
 

  const handleSignUp = async () => {
    // Handle sign-up logic here
    // This function should send the username, email, and password to your backend for registration
    // For example:
    // await axios.post(URL + "/api/auth/signup", { username, email, password }, { withCredentials: true });

  }

  return (

    <div className="Login">
      <form onSubmit={handleSignUp} className="Login-card">
        <h1 className="Login-title">Sign Up</h1>

        <input className="Login-input" type="text" id="username" name="username" placeholder="Username" 
        // value={username}
          // onChange={(e) => setUsername(e.target.value)}
          />
        <input className="Login-input" type="text" id="email" name="email" placeholder="Email" 
        // value={email}
          // onChange={(e) => setEmail(e.target.value)}
          />
        <input className="Login-input" type="password" id="password" name="password" placeholder="Password" 
        // value={password}
          // onChange={(e) => setPassword(e.target.value)}
          />
        <button className="Login-button" type="submit" onClick={handleSignUp}>Sign Up</button>
        {/* {error &&<h3 className="highlight">Something went wrong</h3>} */}
        <p><span className="highlight"
        //  onClick={() => navigate('/Login')}
         >Login in </span> if you have already registered</p>

      </form>

      <div className="google-login">
        <img className="google-logo" src="https://img.icons8.com/?size=100&id=110560&format=png&color=000000"
          alt="Google Logo"></img>
      </div>
    </div>
  )
}

export default Sign