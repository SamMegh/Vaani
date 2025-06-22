
import '../App.css'

const Login = () => {



    const handleLogin = async () => {
        // Handle login logic here
        // This function should send the email and password to your backend for authentication
        // For example:
        // await axios.post(URL + "/api/auth/login", { email, password }, { withCredentials: true });
    }

    return (<>
        <div className="Login">
            <form onSubmit={handleLogin} className="Login-card">
                <h1 className="Login-title">Login</h1>

                <input className="Login-input" type="text" id="email" name="email" placeholder="Email"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
                />
                <input className="Login-input" type="password" id="password" name="password" placeholder="Password"
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
                />
                <button className="Login-button" type="submit" onClick={handleLogin}>Login</button>
                {/* {error && <h3 className="highlight">Something went wrong</h3>} */}
                <p><span className="highlight"
                //  onClick={() => navigate('/Sign')}
                >Sign in </span> if you have not registered yet</p>
            </form>

            <div className="google-login">
                <img className="google-logo" src="https://img.icons8.com/?size=100&id=110560&format=png&color=000000"
                    alt="Google Logo"></img>
            </div>
        </div>
    </>
    )
}

export default Login