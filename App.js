import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Layout from './src/Layout';
import rootReducer from './src/store/reducers/rootReducer';

let store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
        <Layout />
    </Provider>
  );
}