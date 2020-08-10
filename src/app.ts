import * as fromStore from "./store";
import { renderTodos } from "./utils";

const input = document.querySelector("input") as HTMLInputElement;
const button = document.querySelector("button") as HTMLButtonElement;
const destroy = document.querySelector(".unsubscribe") as HTMLButtonElement;
const todoList = document.querySelector(".todos") as HTMLLIElement;

const reducers = {
  // key: string, value: function
  todos: fromStore.reducer,
};
const store = new fromStore.Store(reducers);

console.log(store.value);

button.addEventListener(
  "click",
  () => {
    if (!input.value.trim()) return;

    const payload = { label: input.value, complete: false };
    const action = {
      type: "ADD_TODO",
      payload: payload,
    };
    store.dispatch(action);
    console.log(store.value);
    input.value = "";
  },
  false
);

const unsubscribe = store.subscribe((state) => {
  renderTodos(state.todos.data);
});

// unsubscribe is a function that is returned from store.subscribe()
destroy.addEventListener("click", unsubscribe, false);

todoList.addEventListener("click", function (event) {
  const target = event.target as HTMLButtonElement;
  if (target.nodeName.toLowerCase() === "button") {
    console.log(target);
  }
});

//the function passed as a parameter will be called whenever state changes
store.subscribe((state) => console.log("State Changed:::", state));
