import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AutorBox from './AutorBox';
import LivroBox from './LivroBox';
import Home from './Home';
import './index.css';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';

ReactDOM.render((
        <Router basename={'/cdc-admin'}>
            <App>
                    <Switch>            
                        <Route exact path="/" component={Home}/>
                        <Route path="/autor" component={AutorBox}/>
                        <Route path="/livro" component={LivroBox}/>                
                    </Switch>            
            </App>
        </Router>

), document.getElementById('root'));