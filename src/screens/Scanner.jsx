import React from 'react';
import { View, Text, TouchableOpacity, Vibration } from 'react-native';
import { useState, useEffect } from 'react';
import { Camera } from 'expo-camera';
import { withNavigationFocus, NavigationActions } from 'react-navigation';
import { useIsFocused, CommonActions, StackActions } from '@react-navigation/native';
import { Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { addToHistoryAction } from '../store/actions/HistoryActions';
import { StyleSheet } from 'react-native';

const Scanner = (props) => {

    const [hasPermission, setHasPermission] = useState(null);
    const [isFlashOn, setFlashOn] = useState(false);
    const [isScanned, setScanned] = useState(false);

    const isFocused = useIsFocused();

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();

    }, []);

    const onFlashHandler = () => isFlashOn ? setFlashOn(false) : setFlashOn(true);


    const onBarCodeScanned = async (object) => {
        Vibration.vibrate();
        setScanned(true);
        setFlashOn(false);
        await fetch('https://fr.openfoodfacts.org/api/v0/product/' + object.data)
            .then(jsonResponse => jsonResponse.json())
            .then(response => {
                if (response.product) {
                    props.addToHistory(response.product)
                    props.navigation.dispatch(
                        CommonActions.navigate({
                            name: 'Details',
                            params: {
                                product: response.product
                            }
                        })
                    );
                    setScanned(false);
                }
            })
            .catch(e => console.log(e));
    }

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
        <View style={styles.container}>
            {
                isFocused &&
                <>
                    <Camera
                        style={styles.camera}
                        type={Camera.Constants.Type.back}
                        onBarCodeScanned={isScanned ? undefined : onBarCodeScanned}
                        flashMode={isFlashOn ? Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off}
                    >
                        <View style={styles.flashButton}>
                            <Icon name={isFlashOn ? "flash-on" : "flash-off"} type="material" size={32} color="yellow" onPress={onFlashHandler}/>
                        </View>
                        
                    </Camera>
                </>
            }
        </View>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        addToHistory: (code) => dispatch(addToHistoryAction(code))
    }
}

export default connect(null, mapDispatchToProps)(withNavigationFocus(Scanner));

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    camera: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },
    flashButton: {
        position: "absolute",
        top: 30,
        right: 30
    }
})