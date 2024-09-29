
// import './App.css';
// import React, { Component, useState } from 'react'
// import Navbar from './components/Navbar';
// import News from './components/News';
// import LoadingBar from 'react-top-loading-bar'

// // import {
// //   BrowserRouter as Router,
// //   Switch,
// //   Route,
// //   Link
// // } from "react-router-dom";
// const App =()=> {
//   let Pagesize=6;
//   // let apiKey=process.env.myapikey;
//   // let apiKey='d981295765d748cebe316896cab9da85'
//   let apiKey='82fad0b824c84bbba047dffb93e7d708'
//   const[progress,setProgress]=useState(0);
//   console.log(apiKey);
  

   
//     return (
//       <div>
    
//        <Navbar/>
//        <LoadingBar
//         color='#f11946'
//         progress={progress}
//       />
      
//        <News setProgress={setProgress} pageSize={Pagesize} apiKey={apiKey}category={'general'} country={'in'}/>
        
//       </div>
//     )
  
// }  
// export default App;


import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  Route,
  Routes
} from "react-router-dom";
export default class App extends Component {
  Pagesize=6;
  apiKey=process.env.REACT_APP_NEWS_API;
  state={progress:0};
 
  setProgress=(progress)=>{
  this.setState({progress:progress})
  }
  render() {
   
    return (
      <div>
       <Navbar/>
       <LoadingBar
        color='#f11946'
        progress={this.state.progress}
      />
        
        <Routes>
          <Route path="/" element={<News setProgress={this.setProgress} pageSize={this.Pagesize} apiKey={this.apiKey}category={'general'} country={'in'}/>}/>
          <Route path="/entertainment"  element={<News key="entertainment"setProgress={this.setProgress} pageSize={this.Pagesize} apiKey={this.apiKey}category={'entertainment'} country={'in'}/>}/>
          <Route path="/business" element={<News key="business" setProgress={this.setProgress} pageSize={this.Pagesize} apiKey={this.apiKey}category={'business'} country={'in'}/>}/>
          <Route path="/general" element={<News key="general"setProgress={this.setProgress} pageSize={this.Pagesize} apiKey={this.apiKey}category={'general'} country={'in'}/>}/>
          <Route path="/health" element={<News key="health"setProgress={this.setProgress} pageSize={this.Pagesize} apiKey={this.apiKey}category={'health'} country={'in'}/>}/>
          <Route path="/science" element={<News key="science" setProgress={this.setProgress} pageSize={this.Pagesize} apiKey={this.apiKey}category={'science'} country={'in'}/>}/>
          <Route path="/sports" element={<News key="sports"setProgress={this.setProgress} pageSize={this.Pagesize} apiKey={this.apiKey}category={'sports'} country={'in'}/>}/>
          <Route path="/technology" element={<News key="technology" setProgress={this.setProgress} pageSize={this.Pagesize} apiKey={this.apiKey}category={'technology'} country={'in'}/>}/>
        </Routes>

        
      </div>
    )
  }
}  




    