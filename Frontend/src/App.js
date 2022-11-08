

import { useEffect } from 'react';
import './App.css';
import ResponsiveAppBar from './ResponsiveAppBar';

function App() {
  useEffect(()=>{
    fetch("http://localhost:8080/bestUser").then(res=>res.json())
    .then((result)=>{console.log(result)})
  },[])
  return (
    <div className="App">
     
      <ResponsiveAppBar></ResponsiveAppBar>
      <header className="App-header">
        <img src="/cdb-logo.png" className="App-logo" alt="logo" />
        <p className="App-link">
         Sign in
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Sign up
        </a>
      </header>
    </div>
  );

}

export default App;
