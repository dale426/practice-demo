import React from 'react'
import { Link } from 'react-router'
 function Repos(props){
        console.log(props)

   return (
     <div>  
      this is a Repos!
      <h2>{props.params.repoName}</h2>
      <ul>
          <li><Link to="/repos/reactjs/react-router">React Router</Link></li>
          <li><Link to="/repos/facebook/react">React</Link></li>
     </ul>
     <h3>{props.children}</h3>
     </div>
   )
 }

 export default Repos