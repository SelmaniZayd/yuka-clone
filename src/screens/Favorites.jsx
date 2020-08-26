import React from 'react';
import { fetchFavoritesAction } from '../store/actions/FavoritesActions';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';

const Favorites = (props) => {

    useEffect(props.fetchFavorites, []);

    return (
        
        <View style={styles.container}>
        <Text> Favorties PAGE</Text>
        <FlatList
            data={props.favorites}
            keyExtractor={(item, id) => id + ""}
            renderItem={({ item }) => <Text>{item}</Text>}
        />

    </View>
    );
};

const mapStateToProps = (state) => {
    return {
        favorites: state.favorites
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchFavorites: () => fetchFavoritesAction(dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#eee",
        flex: 1
    }
});