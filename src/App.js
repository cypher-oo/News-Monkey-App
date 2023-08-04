
import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
 
  }
    from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


const App =()=>{
  //to render the variable suppose
 // c='John';
 //ye set progress ka jo v likh rha wo page ko red load jo aata hai link ko krne ke liye
  const pageSize = 5;
  // const apiKey = process.env.REACT_APP_NEWS_API
  const [progress, setProgress] = useState(0)
 
 

 
  
    return (
      <div>
       {/*
     Hello My first name react app {this.c}  this.c rendering the up c which is define as a variable */}
    <Router>
    <Navbar/>
    <LoadingBar
        height={3}
        color='#f11946'
        progress={progress}
     
      />
   <Routes>
    <Route exact path="/"element={<News setProgress={setProgress}  key="entertainment"  pageSize={pageSize} country="in" category="general"/>}/>
    <Route exact path="/business" element={<News setProgress={setProgress}  key="business" pageSize={pageSize} country="in" category="business"/>}/>
    <Route exact path="/entertainment" element={<News setProgress={setProgress}  key="entertainment" pageSize={pageSize} country="in" category="entertainment"/>}/>
    <Route exact path="/general" element={<News setProgress={setProgress}  key="general" pageSize={pageSize} country="in" category="general"/>}/>
    <Route exact path="/health" element={<News setProgress={setProgress}  key="health" pageSize={pageSize} country="in" category="health"/>}/>
    <Route exact path="/science" element={<News setProgress={setProgress}  key="science" pageSize={pageSize} country="in" category="science"/>}/>
    <Route exact path="/technology" element={<News setProgress={setProgress}  key="technology" pageSize={pageSize} country="in" category="technology"/>}/>
    <Route exact path="/sports" element={<News setProgress={setProgress}  key="sports" pageSize={pageSize} country="in" category="sports"/>}/>

   </Routes>
   
    </Router>
      </div>
    )
  }

  export default App;
