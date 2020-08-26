import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Icon } from 'react-native-elements';

const Rating = (props) => {

    const { grade } = props;

    const getColor = () => {
        switch (grade) {
            case "a":
                return "#57e32c";
            case "b":
                return "#b7dd29";
            case "c":
                return "#ffe234";
            case "d":
                return "#ffa534";
            case "e":
                return "#ff4545";
        
            default:
                return "black";
        }
    }

    const getRating = () => {
        switch (grade) {
            case "a":
                return "Exellent";
            case "b":
                return "Bien";
            case "c":
                return "Moyen";
            case "d":
                return "Mauvais";
            case "e":
                return "Très Mauvais";
        
            default:
                return "Inconnu";
        }
    }

    

    return (
        <View style={styles.container}>
            <Icon style={styles.icon} name="circle" type="font-awesome" color={getColor()}/>
            <Text style={styles.rating}>{getRating()}</Text>
        </View>
    );
};

export default Rating;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center"
    },
    icon: {
        marginRight: 10
    },
    rating: {
        fontWeight: "bold",
        fontSize: 17
    }

});