import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'

import authReducer from './slices/auth'
import { indexedStorageDB } from './utils/local-forage' 

const rootPersistConfig = {
	key: 'root',
	version: 1,
	storage: indexedStorageDB
}

const rootReducers = combineReducers({
	auth: authReducer
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducers)

const store = configureStore({
	reducer: persistedReducer,
	devTools: true,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false
		})
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>

export default store
