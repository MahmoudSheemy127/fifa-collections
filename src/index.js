import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './style.css';
import {createStore, applyMiddleware, compose} from 'redux'
import {reducer} from './reducers'
import {Provider} from 'react-redux'


//async functionmiddleware
const asyncFunctionMiddleware = storeAPI => next => action => {
  if(typeof action === 'function')
  {
    return action(storeAPI.dispatch, storeAPI.getState)
  }
  return next(action)
}


const middlewareEnhancer = applyMiddleware(asyncFunctionMiddleware)

// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const composedEnhancer = compose(middlewareEnhancer)

const store = createStore(reducer,composedEnhancer);
// const store = createStore(reducer,middlewareEnhancer);



ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode >
    <App />
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

export default store;