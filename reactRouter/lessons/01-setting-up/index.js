import React from 'react'
import { render } from 'react-dom'
import {Router, Route, hashHistory} from 'react-router'
import App from './modules/App'
import About from './modules/About'
import Repos from './modules/Repos'

// render(<App/>, document.getElementById('app'))
render((
    <Router history={hashHistory}>
         <Route path= '/' component = {App}>
            <Route path = '/about' component = {About} />
            <Route path = '/repos' component = {Repos}>
                <Route path="/repos/:userName/:repoName" component={About}/>
            </Route>

            <Route path = '/repos/:username/:repoName' component = {Repos} />
         </Route>
    </Router>
    ), document.getElementById('app'))
