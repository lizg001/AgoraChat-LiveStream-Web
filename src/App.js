import React,{useEffect} from 'react'
import Main from './layout/main'
import initListen from './utils/WebIMListen'
import layoutApi from './api/layout'
import './App.css';


function App() {
  useEffect(() => {
    initListen()
    layoutApi.openIM()
  }, [])
  
  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;
