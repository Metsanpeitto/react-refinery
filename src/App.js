import React, { useState, useEffect } from "react"
import { GoogleLogin } from 'react-google-login';
import Dashboard from './pages/Dashboard';
import '../node_modules/font-awesome/css/font-awesome.min.css';

function App() {
  const [logged, setLogged] = useState(null)
  const [token, setToken] = useState(null)
  const responseGoogle = (response) => {
    console.log(response);
    if (response) {
      if (response.tokenId) {
        setLogged(true)
        setToken(logged)
        console.log(logged);
      }
    }
  }

  useEffect(() => {
    console.log(logged)
    if (logged) {
      setToken(logged)
      console.log(token)
    }
  }, logged);

  return (
    <div className="">
      {!logged ? <GoogleLogin
        clientId="835224766406-3ar6uifbo7d91dnps3qep31gvmdijdfb.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      /> : null}
      {token ? <Dashboard /> : null}
    </div>)
}
export default App;






