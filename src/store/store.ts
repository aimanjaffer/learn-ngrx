export class Store {
  private subscribers: Function[];
  private reducers: { [key: string]: Function };
  private state: { [key: string]: any };

  constructor(reducers = {}, initialState = {}) {
    this.subscribers = [];
    this.reducers = reducers;
    this.state = this.reduce(initialState, {});
  }

  get value() {
    return this.state;
  }
  subscribe(fn) {
    this.subscribers = [...this.subscribers, fn];
    this.notify();
    //unsubscribe as soon as we call the result of subscribe
    return () => {
      this.subscribers = this.subscribers.filter((sub) => sub != fn);
    };
  }
  dispatch(action) {
    // when you dispatch an action, you need to call the reduce method with the current state and the action
    // this is now the new state
    this.state = this.reduce(this.state, action);
    this.notify();
  }
  private reduce(state, action) {
    const newState = {};
    for (const prop in this.reducers) {
      //adding a new property to the state and calling the respective reducer function
      //each reducer deals with a slice of the state, pass in only that slice to the reducer function
      newState[prop] = this.reducers[prop](state[prop], action);
    }
    return newState;
  }
  private notify() {
    // pass the new state ie. this.value to each subscriber
    // for each subscriber function call it with state as a parameter
    this.subscribers.forEach((fn) => fn(this.value));
  }
}
