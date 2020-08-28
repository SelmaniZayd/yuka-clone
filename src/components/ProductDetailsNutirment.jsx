import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Icon } from 'react-native-elements';

const ProductDetailsNutirment = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <Icon name={props.iconName} size={30} type={props.iconType} color="grey" />
                <Text style={styles.nutrimentName} >{props.name}</Text>
            </View>
            <View style={styles.right}>
                <Text>{props.quantity} {props.quantityUnit}</Text>
            </View>
        </View>
    );
};

export default ProductDetailsNutirment;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        justifyContent: "space-between",
        borderBottomColor: "#dbdbdb",
        borderBottomWidth: 1,
        borderBottomEndRadius: 25,
        borderBottomStartRadius: 25
    },
    left: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    right: {

    },
    nutrimentName: {
        fontSize: 17,
        fontWeight: "bold",
        marginLeft: 8,
        color: "grey"
    },
    nutrimentQuantity: {

    }

})