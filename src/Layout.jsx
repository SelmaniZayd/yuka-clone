import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import Home from './screens/Home';

const Layout = () => {
    return (
        <View style={styles.container}>
            <Home />
        </View>
    );
};

export default Layout;

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight
    }
})