## ==================== <START REVIEW> ================##
# ------ React & Redux Fundamentals Refresher --------------
- Review of Redux terms, concepts, life cycle (see wall drawing), functions
- What does redux not do:
    - Async
    
## ===================== <END REVIEW> ===================##


### ================ <REDUX SAGA INTRO NOTES> =================###

# ---------------------- <TERMINAL> ----------------------#
- npm install redux-saga

# ---------------------- HOW TO HANDLE ASYNC ----------------------#
- Could use Promises, on .then, dispatch an action:
    - Pros:
        - No additional library
    - Cons:
        - No real way to handle side effects, like loading spinners

- A better option could be to use Redux-Saga:
    - A side effect middleware redux helper library Intercepts actions and make a flow of events
    - Pros:
        - Can handle side effects
        - Easy to read and manage
    - Cons: 
        - Less straightforward syntax

- Side Effects, are the things that are triggered but you don't have control over when they fire or complete. 
- Common things that are side effects that sagas MAKE EASY:
    - Loading spinners showing or hiding
    - Displaying and hiding error messages, toasts, etc..
    - Scheduling api calls (DOESN'T ACTUALLY MAKE THE CALL)


# ------------------- REDUX-SAGA CONCEPTUAL -------------------
- Could be called:
    - redux-process-manager
- Allows you to write async code that looks synchronous
- Sagas, like Reducers, listen for actions
    - Sagas will intercept actions BEFORE the reducer
- Sagas can do these things:
    - Dispatching other actions
    - Trigger HTTP calls
- The end of saga dispatches a new action, that sends info to the reducer to be saved in the store
- If you don't have a saga intercept an action, it still can be used by the reducer

- *** SEE NOTES FOR LIFE CYCLE DIAGRAM ***

# ---------------- MAKE AXIOS REQUESTS FROM APP.JS ----------------
- The most important Async thing we can do on the CLIENT SIDE is api calls

- See current handleClick (addElement)

- Replace our list with the list from the server
    - Our Reducer does that (elementListReducer)


# ---------------- CREATING OUR FIRST REDUX SAGA ----------------
- In terminal:
    - npm install redux-saga

- Update index.js:
    - Import createSagaMiddleware
    - Import takeEvery
    - update watcherSage generator function ('SET_ELEMENTS' replaced with 'RUN_FIRST_SAGA')
    - Create firstSaga generator function

- Like other middleware, redux-saga has access to every dispatched action
- It's special because it is a middleware that can dispatch other actions
- To listen for specific actions, we use takeEffect in our watcherSaga

--------------------------------------------------------------------
- Current path:
    1. App.js dispatches an action

    2. Since it is a middleware, our rootSaga picks up all actions.

    3. watcherSaga (almost like server-side routing) acts as the 
    traffic cop. It says "I see this action, should I do something with it?" If it matches, it runs the corresponding saga. In this case, takeEvery matches with RUN_FIRST_SAGA and runs firstSaga

    4. firstSaga runs our console log.
--------------------------------------------------------------------


### ============= START GENERATOR FUNCTIONS =======================

# -------------- FUNCTION* myGenerator ()  --------------
- Steps:
    - Create myGenerator function in index.js
    - Create an instance
    - Call generator with .next()
    - npm run server -> npm run client
    - Create getSwitch generator function to prevent infinite loops
        - const toggle = getSwitch()...
    - 
- In a Generator function, a 'return' will stop the function

- 

# -------------- KEY TAKEAWAYS --------------
- Generators remember where they were last time they were called, 'yield' is how we pause the generator
- Redux Sagas use Generators as the backbone to help orchestrate and organize async operations, like AJAX calls
- Key Vocab:
    - yield
    - function*
    - .next()

### ============= END GENERATOR FUNCTIONS =====================
    -----------------------------------------------------------

### ===============* BACK TO REDUX SAGA INTRO *===============##

# ---------------- MOVE GET REQUEST TO REDUX SAGA ----------------
- All this work just got us a console log


# ---------------- MOVE POST TO REDUX SAGA ----------------


