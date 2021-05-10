import { createStore } from "redux";
import reducers from "../reducers";

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__({
    serialize: true,
  });

export const customCreateStore = () => createStore(reducers, composeEnhancers);
