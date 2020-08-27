import React from 'react';
import { fetchFavoritesAction, deleteFromFavoritesAction } from '../store/actions/FavoritesActions';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import ProductThumb from '../components/ProductThumb';

const Favorites = (props) => {

    useEffect(props.fetchFavorites, []);

    return (
        
        <View style={styles.container}>
            <FlatList
                data={props.favorites}
                keyExtractor={(item, id) => id + ""}
                renderItem={({ item }) => <ProductThumb {...props} product={item} onDelete={() => props.deleteFromFavorites(item.code)}/>}
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
        fetchFavorites: () => fetchFavoritesAction(dispatch),
        deleteFromFavorites: (code) =>  dispatch(deleteFromFavoritesAction(code))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#eee",
        flex: 1
    }
});