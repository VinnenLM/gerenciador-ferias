import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import usuarioStore from './usuarioStore';

const persistConfig = {
    key: 'root',
    storage,
}

const persistencia = persistReducer(persistConfig, usuarioStore);

const store = configureStore(
    {
        reducer: persistencia,
        middleware: getDefaultMiddleware => getDefaultMiddleware({
            serializableCheck: false
        })
    });
    
const persistor = persistStore(store);

export { store, persistor };