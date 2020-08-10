export class Store{
    private subscribers: Function[];
    private reducers: {[key: string]: Function};
    private state: {[key: string]: any};

    constructor(reducers = {}, initialState = {}){
        this.reducers = reducers;
        this.state = this.reduce(initialState,{});
    }

    get value() {
        return this.state;
    }
    dispatch(action){
        // when you dispatch an action, you need to call the reducer with the current state and the action
        // this is now the new state
        this.state = this.reduce(this.state, action);
    }
    private reduce(state, action){
        const newState = {};
        for(const prop in this.reducers){
            //adding a new property to the state and calling the respective reducer function
            //each reducer deals with a slice of the state, pass in only that slice to the reducer function
            newState[prop] = this.reducers[prop](state[prop], action);
        }
        return newState;
    }
}