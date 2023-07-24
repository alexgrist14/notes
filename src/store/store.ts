import {combineReducers, configureStore, Middleware} from '@reduxjs/toolkit';
import noteReducer from './reducers/NoteSlice';

const rootReducer = combineReducers({
    noteReducer
});

export type RootState = ReturnType<typeof rootReducer>

const notesLocalStorageMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
    const result = next(action);
    if (action.type.startsWith('note')) {
        localStorage.setItem('notes', JSON.stringify(store.getState().noteReducer.notes));
    }
    return result;
}

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: [notesLocalStorageMiddleware]
    })
}

export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch'];