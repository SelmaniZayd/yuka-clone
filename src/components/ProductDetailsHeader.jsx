import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import Rating from './Rating';
import { Icon } from 'react-native-elements';
import { addToFavoritesAction } from '../store/actions/FavoritesActions';
import { connect } from 'react-redux';


const ProductDetailsHeader = (props) => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: props.product.image_front_small_url }} />
            <View style={styles.right}>
                <View style={styles.product}>
                    <Text style={styles.productName}>{props.product.product_name}</Text>
                    <Text style={styles.brandName}>{props.product.brands}</Text>
                </View>
                <Rating grade={props.product.nutrition_grades} />
            </View>
            <View style={styles.icon}>
                <Icon name="star" type="font-awesome-5" color="pink" raised reverse
                    onPress={() => props.addToFavorites(props.product.code)}
                />
            </View>
        </View>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        addToFavorites: (code) => dispatch(addToFavoritesAction(code))
    }
}

export default connect(null, mapDispatchToProps)(ProductDetailsHeader);

const styles = StyleSheet.create({
    container: {
        height: 150,
        display: "flex",
        flexDirection: "row",
        padding: 20,
        justifyContent: "space-between",
        backgroundColor: "white"
    },
    image: {
        width: "28%",
        borderRadius: 8
    },
    right: {
        display: "flex",
        height: "100%",
        justifyContent: "space-between",
        paddingTop: 15,
        paddingBottom: 15
    },
    product: {

    },
    productName: {
        fontSize: 25,
        fontWeight: "bold"
    },
    brandName: {

    },
    productRating: {

    },
    icon: {
        position: "absolute",
        bottom: 0,
        right: 0
    }
});