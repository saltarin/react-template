import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

const reduxDevTool = process.env.NODE_ENV !== 'prod' ?
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__():
  undefined;

export default createStore(
  combineReducers({}),
  compose(
    reduxDevTool,
    applyMiddleware(thunk)
  )
);