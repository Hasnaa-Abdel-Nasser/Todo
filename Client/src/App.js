import './App.css';
import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import {useIsAuthenticated } from 'react-auth-kit';
import {HomePage , Login , Register , VerifyEmail , ForgetPassword , NewPassword , Upcoming} from './components/index'
function App() {
  const PrivateRoute = ({ Component }) => {
    const isAuthenticated = useIsAuthenticated();
    const auth = isAuthenticated();
    return auth ? <Component /> : <Navigate to="/login" />;
};

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<HomePage/>}/>
        <Route path='/login' exact element={<Login/>}/>
        <Route path='/register' exact element={<Register/>}/>
        <Route path='/verify/:process/:email' exact element={<VerifyEmail />}/>
        <Route path='/forget-password' exact element={<ForgetPassword/>}/>
        <Route path='/new-password' exact element={<NewPassword/>}/>
        <Route path='/dashboard' exact element={<PrivateRoute Component={Upcoming}/>}/>
      </Routes>
    </Router>
  );
}

export default App;
