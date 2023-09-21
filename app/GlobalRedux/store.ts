'use client';

import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './Features/counter/counterSlice';
import thunkMiddleware from 'redux-thunk';
export const store = configureStore({
    reducer: {
        counter: counterReducer,
    },
    middleware: [thunkMiddleware],
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;