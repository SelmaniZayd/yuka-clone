import React from 'react';
import { View, Text, Vibration } from 'react-native';
import { useState, useEffect } from 'react';
import { Camera } from 'expo-camera';
import { withNavigationFocus, SafeAreaView } from 'react-navigation';
import { useIsFocused, CommonActions } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
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
        <SafeAreaView style={styles.container}>
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
                            <Icon name={isFlashOn ? "flash-on" : "flash-off"} type="material" size={32} color="yellow" onPress={onFlashHandler} />
                        </View>

                        <View style={styles.overlay}>
                            <View style={styles.top}>
                                <View style={styles.secondTop}></View>
                            </View>
                            <View style={styles.middle}>
                                <View style={styles.left}></View>
                                <View style={styles.right}></View>
                            </View>
                            <View style={styles.bottom}>
                                <View style={styles.secondBottom}></View>
                            </View>
                        </View>

                    </Camera>
                </>
            }
        </SafeAreaView>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        addToHistory: (code) => dispatch(addToHistoryAction(code))
    }
}

export default connect(null, mapDispatchToProps)(withNavigationFocus(Scanner));

const styles = StyleSheet.create({
    overlay: {
        flex: 1
    },
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
    },
    top: {
        height: 180,
        width: "100%",
        backgroundColor: "black",
        opacity: 0.5,
    },
    middle: {
        flexDirection: "row",
        width: "100%",
        flex: 1,
        justifyContent: "space-between"
    },
    bottom: {
        backgroundColor: "black",
        width: "100%",
        height: 180,
        opacity: 0.5,
    },
    left: {
        width: 50,
        height: "100%",
        backgroundColor: "black",
        borderRightWidth: 2,
        borderRightColor: "white",
        opacity: 0.5,
    },
    right: {
        width: 50,
        height: "100%",
        backgroundColor: "black",
        borderLeftWidth: 2,
        borderLeftColor: "white",
        opacity: 0.5,
    },
    secondTop: {
        borderBottomWidth: 2,
        borderBottomColor: "white",
        flex: 1,
        marginHorizontal: 50
    },
    secondBottom: {
        borderTopWidth: 2,
        borderTopColor: "white",
        flex: 1,
        marginHorizontal: 50
    }
})