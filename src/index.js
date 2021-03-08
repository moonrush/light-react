import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App/App'
import Home from './Home/Home'
import Share from './Share/Share'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter as Router, Route } from "react-router-dom"

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Route path="/" exact component={Home} />
            <Route path="/play" component={App} />
            <Route path="/share" component={Share} />
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
