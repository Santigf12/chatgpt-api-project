

function Login({ login }) {

    return (
        <>
            <div className={`section active`}>
                <div className={`nav active`}>
                    <div className="nav-left">
                        <button className="button" id="toggle">☰</button>
                    </div>
                    <div className="nav-centered">
                        <h1>Lotion</h1>
                        <p>Like Notion, but worse.</p>
                    </div>
                    
                </div>

            </div>
        
        
            <div className="login" >
                <div className="login-container">
                    <button id="google-button" onClick={login}>Continue with google</button>
                </div>
            </div>
        </>


    );
}

export default Login;