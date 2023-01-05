import { combineReducers } from "redux";
import { reducer, reducerDetail } from "./reducer";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage: storage
};

const rootReducer = combineReducers({
    reducer,
    reducerDetail
});

export default persistReducer(persistConfig, rootReducer);