import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { useState } from 'react';
import ProductDetailsHeader from '../components/ProductDetailsHeader';
import { addToHistoryAction } from '../store/actions';
import { connect } from 'react-redux';


const ProductDetails = (props) => {

    const [currentProduct, setCurrentProduct] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://fr.openfoodfacts.org/api/v0/product/' + props.route.params.data)
            .then(jsonResponse => jsonResponse.json())
            .then(response => {
                console.log(response.product.product_name);
                setCurrentProduct(response.product);
                props.addToHistory(response.product.code);
            })
            .catch(e => console.log(e))
            .finally(() => setLoading(false))

        const clean = () => {
            setLoading(true);
            setCurrentProduct(null);
        };

        return clean;

    }, [props.navigation]);

    let productJSX = null;
    if (!isLoading) {
        productJSX = (
            <View style={styles.container}>
                <ProductDetailsHeader product={currentProduct} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {
                isLoading ? <Text>LOADING ...</Text> : productJSX
            }
        </View>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        addToHistory: (code) => dispatch(addToHistoryAction(code)),
        addToFavorites: (code) => dispatch(addToFavoritesAction(code))
    }
}

export default connect(null, mapDispatchToProps)(ProductDetails);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "red",
    },
    
})