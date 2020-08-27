import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { useEffect } from 'react';
import { useState } from 'react';

const DateComponent = (props) => {

    const [dateTaken, setDateTaken] = useState(null);

    useEffect(() => {
        if (props.date) {
            setDateTaken(dateToString());
            const unsubscribe = props.navigation.addListener('focus', () => {
                setDateTaken(dateToString());
            });
            return unsubscribe;
        }
    }, []);

    const dateToString = () => {
        let seconds = Math.floor((new Date() - props.date) / 1000);

        let interval = seconds / 31536000;

        if (interval > 1) {
            return Math.floor(interval) + " années";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
            return Math.floor(interval) + " mois";
        }
        interval = seconds / 86400;
        if (interval > 1) {
            return Math.floor(interval) + " jours";
        }
        interval = seconds / 3600;
        if (interval > 1) {
            return Math.floor(interval) + " heures";
        }
        interval = seconds / 60;
        if (interval > 1) {
            return Math.floor(interval) + " minutes";
        }
        return Math.floor(seconds) + " secondes";
    };

    return (
        <View style={styles.container}>
            <Icon size={20} style={styles.icon} name="history" type="font-awesome" />
            <Text style={styles.date}>il y'a {dateTaken}</Text>
        </View>
    );
};

export default DateComponent;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center"
    },
    icon: {
        marginRight: 10
    },
    date: {
        fontWeight: "100",
        fontSize: 11
    }

});