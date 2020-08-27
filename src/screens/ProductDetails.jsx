import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ProductDetailsHeader from '../components/ProductDetailsHeader';


const ProductDetails = (props) => {

    const productJSX = (
        <View style={styles.container}>
            <ProductDetailsHeader product={props.route.params.product} />
        </View>);

    return (
        <View style={styles.container}>
            {
                productJSX
            }
        </View>
    );
};

export default ProductDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "red",
    },

})