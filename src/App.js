import React from 'react'
import Home from './components/Home';
import RandomGenerate from './components/RandomGenerate'
import  MyList  from './components/MyList';
import Form from './components/form';
import {BrowserRouter as Router, Route} from 'react-router-dom';
const App = () => {
    return(
    <Router>
        <Route exact path="/"><Home /></Route>
        <Route path="/Generate"> <RandomGenerate /></Route>
        <Route path="/List"> <MyList /></Route>
        <Route path="/Form">
            <Form />
        </Route>
    </Router>
    )
}

export default App;