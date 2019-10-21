import React from 'react'
import {Link} from 'react-router'
/*export default React.createClass({
  render() {
  console.log(this.props)
    
   return (
     <div>  
      <h1> this is react-rrouter </h1>
      <ul role = "nav">
        <li>
          <Link to = '/about'>to about</Link>
        </li>
        <li>
          <Link to = '/repos'>to repos</Link>
        </li>
      </ul>

      {this.props.children}
     </div>
   )
  }
})*/




 function App(props){
   return (
     <div>  
      <h1> this is react-rrouter </h1>
      <ul role = "nav">
        <li>
          <Link activeStyle = {{color: 'red'}} to = '/about'>to about</Link>
        </li>
        <li>
          <Link activeStyle = {{border: '1px solid blue'}} to = '/repos'>to repos</Link>
        </li>
      </ul>
        {props.children}
     </div>
   )
 }

 export default App