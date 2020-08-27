import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { fetchHistoryAction, deleteFromHistoryAction } from '../store/actions/HistoryActions';
import { useEffect } from 'react';
import ProductThumb from '../components/ProductThumb';
 
const MyHome = (props) => {

    useEffect(()=> {
        props.fetchHistory();
        const unsubscribe = props.navigation.addListener('focus', () => {
            props.fetchHistory();
        });

        return unsubscribe;
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={props.history}
                keyExtractor={(item, id) => id + ""}
                renderItem={({ item }) => <ProductThumb {...props} product={item} onDelete={() => props.deleteFromHistory(item.code)}/>}
            />
        </View>
    );
};

const mapStateToProps = (state) => {
    return {
        history: state.history
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchHistory: () => fetchHistoryAction(dispatch),
        deleteFromHistory: (code) => dispatch(deleteFromHistoryAction(code))
    }
}

const Home = connect(mapStateToProps, mapDispatchToProps)(MyHome);

export default Home;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#eee",
        flex: 1
    }
})