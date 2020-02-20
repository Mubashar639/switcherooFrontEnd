import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import Reducers from "./Reducers/index";
import { persistStore } from "redux-persist";
import logger from "redux-logger";

let store = createStore(Reducers, applyMiddleware(thunk,logger));
let persistor = persistStore(store);
export { store, persistor };
