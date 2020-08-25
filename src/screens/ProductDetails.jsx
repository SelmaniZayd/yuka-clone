import React, { useEffect } from 'react';
import {View, StyleSheet, Text, ProgressBarAndroidComponent} from 'react-native';
import { useState } from 'react';

const ProductDetails = (props) => {

    const [currentProduct, setCurrentProduct] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://fr.openfoodfacts.org/api/v0/product/'+ props.route.params.data)
            .then(jsonResponse => jsonResponse.json())
            .then(response => setCurrentProduct(response.product))
            .catch(e => console.log(e))
            .finally(() => setLoading(false))
    }, []);

    return (
        <View style={styles.container}>
            {
                isLoading ? <Text>LOADING ...</Text> : <Text>{currentProduct.brands}</Text>
            }
        </View>
    );
};

export default ProductDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})