import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const ProductNutrimentsHeader = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Valeurs nutritionnelles pour {props.volume}</Text>
        </View>
    );
};

export default ProductNutrimentsHeader;

const styles = StyleSheet.create({
    container: {
        padding: 12,
        borderBottomWidth: 2
    },
    text: {
        fontSize: 18,
        fontWeight: "bold"
    }
})