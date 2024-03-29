import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter} from 'react-router-dom'
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose,combineReducers} from 'redux'
import orgReducer from './store/reducers/orgDetailsReducer'
import firebase from './FirebaseDb/firebase'
import plasmaDonarReducer from './store/reducers/plasmaDetailsReducer'
import plasmaReqReducer from './store/reducers/plasmaRequestReducer'
import feedbackReducer from './store/reducers/feedbackReducer'

import authReducer from './store/reducers/authReducer'
import commonReducer from './store/reducers/commondReducer'
import covidBedReducer from './store/reducers/covidBedReducer'
import foodReducer from './store/reducers/foodReducer'

import oxygenDetailReducer from './store/reducers/oxygenDetailReducer'
import oxygenRequestReducer from './store/reducers/oxygenRequestReducer'


const rootReducer  = combineReducers({
  orgReducer : orgReducer,
  plasmaReqReducer : plasmaReqReducer,
  plasmaDonarReducer: plasmaDonarReducer,
  feedbackReducer:feedbackReducer,
  authReducer:authReducer,
  commonReducer:commonReducer,
  covidBedReducer:covidBedReducer,
  foodReducer:foodReducer,

  oxygenDetailReducer:oxygenDetailReducer,
  oxygenRequestReducer:oxygenRequestReducer

})

const  componseEnchacer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, componseEnchacer(applyMiddleware(thunk)));
const app = (
  <Provider store={store}>
      <BrowserRouter>
        <App/>
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(
  <React.StrictMode>
    {app}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
