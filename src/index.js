import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App.jsx';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
// Bringing redux-saga into our project:
import createSagaMiddleware from 'redux-saga';

import logger from 'redux-logger';
// To listen for specific actions, we need to us the takeEvery effect into our watcherSaga
import { takeEvery } from 'redux-saga/effects';
// =================== IMPORTS ===================

// -------------------- START myGenerator FUNCTION --------------------
// Function will pause at the yield until function called again
function* myGenerator() {
    yield true;
    yield 100
    yield 'Hello!'
    yield [1, 2, 3]
    yield { key: 'value' }
}

// Prevents infinite loops
function* getSwitch() {
    while(true) {
        yield 'on';
        yield 'off';
    }
}

// Prevents infinite loops
const toggle = getSwitch();
console.log(toggle.next().value); // 'on'
console.log(toggle.next().value); // 'off'
console.log(toggle.next().value); // 'on'


// Create an instance
const goDogGo = myGenerator();

// Call generator with .next()
console.log(goDogGo.next());
console.log(goDogGo.next());
console.log(goDogGo.next());
console.log(goDogGo.next());
console.log(goDogGo.next());
console.log(goDogGo.next());
console.log(goDogGo.next());
console.log(goDogGo.next());


// *** WHAT DOES THIS DO????????
// function* countDownGenerator() {
//     let a = 10;
//     while(a > 0) {
//       yield `Launching in ${a}`;
//       a -= 1;
//     }
//     yield `Take off!`;
// }
// *** WHAT DOES THIS DO????????



// -------------------- END myGenerator FUNCTION --------------------


const elementList = (state = [], action) => {
    switch (action.type) {
        case 'SET_ELEMENTS':
            return action.payload;
        default:
            return state;
    }
}; 

// Generator function
// First it is logging to see the action
// 
function* firstSaga(action) {
    console.log('firstSaga was hit with action:', action);
}

// This is the saga that will watch for actions
// A special generator function
// Let us run code synchronously
function* watcherSaga() {
    // Use takeEvery
    // We are saying every time our action has a type of SET_ELEMENTS
    // we will run firstSaga (created after elementList reducer)
    yield takeEvery('RUN_FIRST_SAGA', firstSaga);
}


const sagaMiddleware = createSagaMiddleware();

// This is creating the store
// the store is the big JavaScript Object that holds all of the information for our application
const storeInstance = createStore(
    // This function is our first reducer
    // reducer is a function that runs every time an action is dispatched
    combineReducers({
        elementList,
    }),
    applyMiddleware(sagaMiddleware, logger),
);

sagaMiddleware.run(watcherSaga);

ReactDOM.render(
    <Provider store={storeInstance}>
        <App/>
    </Provider>, 
    document.getElementById('root')
);

registerServiceWorker();
