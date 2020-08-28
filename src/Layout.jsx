import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Home from './screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Scanner from './screens/Scanner';
import { Icon } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import ProductDetails from './screens/ProductDetails';
import { SafeAreaView } from 'react-native-safe-area-context';
import Favorites from './screens/Favorites';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home}
                options={{
                    title: "YUKA CLONE",
                    headerTintColor: "black",
                    headerStyle: { backgroundColor: "#d6d6d6" }
                }} />
            <Stack.Screen name="Details" component={ProductDetails} options={{ title: "Details", headerStyle: { backgroundColor: "#d6d6d6"} }} />
        </Stack.Navigator>
    );
}

const FavoritesStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Favorites" component={Favorites}
                options={{
                    title: "Favorites",
                    headerTintColor: "black",
                    headerStyle: { backgroundColor: "#d6d6d6" }
                }} />
        </Stack.Navigator>
    );
}

const Layout = (props) => {
    return (
        <>
            <SafeAreaView style={styles.container}>
                <Text>{props.route}</Text>
            </SafeAreaView>
            <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Screen
                        name="Home"
                        component={HomeStack}
                        options={{
                            tabBarIcon: () => <Icon name="home" size={30} type="material" />,
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
                        component={FavoritesStack}
                        options={{
                            tabBarIcon: () => <Icon name="star" size={30} type="material" />
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
    }
});