import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import ProductDetailsHeader from '../components/ProductDetailsHeader';
import ProductDetailsNutriments from '../components/ProductDetailsNutriments';


const ProductDetails = (props) => {

    const productJSX = (
        <ScrollView style={styles.container}>
            <ProductDetailsHeader product={props.route.params.product} />
            <ProductDetailsNutriments product={props.route.params.product} />
        </ScrollView>);

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
        backgroundColor: "#dbdbdb"
    },

})