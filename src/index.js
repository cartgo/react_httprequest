import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {NavLink, BrowserRouter, Switch,Route } from 'react-router-dom';
import Newitemform from './Newitemform/Newitemform'

ReactDOM.render(
  <BrowserRouter>
  <React.StrictMode>
  <nav>
        <ul>
            <li><NavLink 
            // to={{
                // pathname: '/'
                // hash: '#submit',
                // search: '?quick-submit=true'
            // }}
            to="/"
            exact
            activeClassName="my-active"
            activeStyle={{
                color: '#dd677b',
                textDecoration: 'underline' }}
          >Table</NavLink></li>

            <li ><NavLink
                to="/Newitemform"
                exact
                activeClassName="my-active"
                activeStyle={{
                    color: '#dd677b',
                    textDecoration: 'underline'
                }}>Add a Post</NavLink></li>
            
        </ul>
    </nav>

  {/* <Link to={'/Newitemform'} >Newitemform</Link> <br/>
  <Link to={'/'} >table</Link> */}
  <Switch>   
  <Route path= '/Newitemform'  component = {Newitemform} ></Route>
  <Route path= '/'  component = {App} ></Route>
</Switch>  
    {/* <App />
    <Home /> */}
  </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
