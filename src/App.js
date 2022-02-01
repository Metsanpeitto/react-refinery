import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import Dashboard from './pages/Dashboard';
import { addUser } from './redux/reducers/auth/auth';

import '../node_modules/font-awesome/css/font-awesome.min.css';

function App() {
  const dispatch = useDispatch();
  const { authReducer } = useSelector((state) => state);
  const { auth } = authReducer;
  const [logged, setLogged] = useState(null)


  const responseGoogle = (response) => {
    if (response) {
      if (response.tokenId) {
        dispatch(addUser(response))
      }
    }
  }

  useEffect(() => {
    if (auth.Ba) {
      setLogged(true)
    }
  }, auth.Ba);

  return (
    <section>
      {!logged ? <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_USER_ID}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      /> : <Dashboard />}
    </section>)
}
export default App;






