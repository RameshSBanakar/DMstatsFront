import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import FileReducer from "./Reducers/FileReducer";
import xmlReducer from "./Reducers/XmlRducers";
import dbReducer from "./Reducers/DbReducer";
import userReducer from "./Reducers/UserReducer"
import dmpath from "./Reducers/dmpathReducer";
import historyReducer from "./Reducers/HistoryReducer"
import rightSidebarReducer from "./Reducers/RightSideBar"
import spinnerReducer from "./Reducers/SpinnerReducer"
const rootReducer = combineReducers({
  fileListOfDM: FileReducer,
  dbFileData: dbReducer,
  xmlFileData: xmlReducer,
  userReducer: userReducer,
  dmpath: dmpath,
  history: historyReducer,
  rightSideBar: rightSidebarReducer,
  spinner:spinnerReducer
});
const Store = createStore(rootReducer, applyMiddleware(...[thunk]));
export default Store;
