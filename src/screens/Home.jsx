import React from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { incrementCountAction } from '../store/actions';

const MyHome = (props) => {
    return (
        <View>
            <Text> HOME PAGE</Text>
            <Text> count currently is : {props.count} </Text>
            <Button title="increment count" onPress={props.incrementCount}/>
        </View>
    );
};

const mapStateToProps = (state) => {
    return {
        count: state.count
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        incrementCount: () => dispatch(incrementCountAction())
    }
}

const Home = connect(mapStateToProps, mapDispatchToProps)(MyHome);

export default Home;