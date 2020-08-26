import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { fetchHistoryAction } from '../store/actions';
import { useEffect } from 'react';

const MyHome = (props) => {

    useEffect(props.fetchHistory, []);

    return (
        <View style={styles.container}>
            <Text> HOME PAGE</Text>
            <FlatList
                data={props.history}
                keyExtractor={(item, id) => id+""}
                renderItem={({ item }) => <Text style={{margin: 10, backgroundColor: "yellow"}} >{item}</Text>}
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
        fetchHistory: () => fetchHistoryAction(dispatch)
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