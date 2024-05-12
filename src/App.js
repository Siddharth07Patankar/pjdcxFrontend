import logo from './logo.svg';
import './App.css';
import Login from './Login/Login';
import Table from './Tables/Table';
import { Route, Routes } from "react-router-dom";
function App() {
  const isValidated = localStorage.getItem('validate');
  console.log(isValidated);

  if(!isValidated){
    return <Login />
  }
  return (
    <>
    <Routes>
      <Route path='/' element={<Table />}></Route>
    </Routes>
    </>
  );
}

export default App;
