import React from 'react';
import { View, StyleSheet, Image, Text, Alert, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import Rating from './Rating';
import { useState } from 'react';
import { useEffect } from 'react';
import DateComponent from './DateComponent';
import { CommonActions } from '@react-navigation/native';

const ProductThumb = (props) => {

    const clickHandler = () => {
        const productWithoutDate = {...props.product};
        delete productWithoutDate.date;
        props.navigation.dispatch(
            CommonActions.navigate({
                name: 'Details',
                params: {
                    product: productWithoutDate
                }
            })
        );
    }

    let dateJSX = <></>;
    if (props.product.date) {
        dateJSX = (<View></View>);
    }

    return (
        <>
            <TouchableOpacity onPress={clickHandler}>
                <View style={styles.container}>
                    <Image style={styles.image} source={{ uri: props.product.image_front_thumb_url }} />
                    <View style={styles.right}>
                        <View style={styles.product}>
                            <Text style={styles.productName}>{props.product.product_name}</Text>
                            <Text style={styles.brandName}>{props.product.brands}</Text>
                        </View>
                        <Rating grade={props.product.nutrition_grades} />
                        {props.product.date ? <DateComponent navigation={props.navigation} date={props.product.date} /> : <></>}
                    </View>
                    <View style={styles.icon}>
                        <Icon name="trash-alt" type="font-awesome-5" color="red" raised reverse
                            onPress={props.onDelete}
                        />
                    </View>
                </View>
            </TouchableOpacity>

        </>
    );
};

export default ProductThumb;

const styles = StyleSheet.create({
    container: {
        height: 130,
        display: "flex",
        flexDirection: "row",
        padding: 15,
        justifyContent: "center",
        backgroundColor: "white",
        marginBottom: 20
    },
    image: {
        height: 103,
        width: 60,
        borderRadius: 8,
        marginRight: 30
    },
    right: {
        display: "flex",
        height: "100%",
        justifyContent: "space-between",
        paddingTop: 5,
        paddingBottom: 5,
        width: '62%'
    },
    product: {

    },
    productName: {
        fontSize: 15,
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