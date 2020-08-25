import React from 'react';
import { View, StyleSheet, StatusBar, Text } from 'react-native';
import Home from './screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Scanner from './screens/Scanner';
import { Icon } from 'react-native-elements';
import {createStackNavigator} from '@react-navigation/stack';
import ProductDetails from './screens/ProductDetails';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Details" component={ProductDetails}/>
        </Stack.Navigator>
    );
}

const Layout = (props) => {
    return (
        <>
            <View style={styles.container}>
                <Text>{props.route}</Text>
            </View>
            <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Screen
                        name="Home"
                        component={HomeStack}
                        options={{
                            tabBarIcon: () => <Icon name="home" size={30} type="material"/>,

                        }}
                    />
                    <Tab.Screen
                        name="Scanner"
                        component={Scanner}
                        options={{
                            tabBarIcon: () => <Icon name="qrcode" size={30} type="font-awesome" />,

                        }}
                    />
                    <Tab.Screen
                        name="Favorites"
                        component={Home}
                        options={{
                            tabBarIcon: () => <Icon name="home" size={30} type="material" />,

                        }}
                    />
                    <Tab.Screen
                        name="History"
                        component={Home}
                        options={{
                            tabBarIcon: () => <Icon name="home" size={30} type="material" />,

                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </>
    );
};

export default Layout;

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight
    }
});