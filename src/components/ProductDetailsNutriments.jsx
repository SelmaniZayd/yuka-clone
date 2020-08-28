import React from 'react';
import { View, StyleSheet } from 'react-native';
import ProductDetailsNutirment from './ProductDetailsNutirment';
import ProductNutrimentsHeader from './ProductNutrimentsHeader';

const ProductDetailsNutriments = (props) => {

    const {product} = props;

    return (
        <View style={styles.container}>
            <ProductNutrimentsHeader volume={product["nutrition_data_per"]} />
            <ProductDetailsNutirment 
                name="Calories" 
                quantity={product.nutriments["energy-kcal_100g"]} 
                quantityUnit="Kcal" 
                iconName="fire"
                iconType="font-awesome-5"
                />
            <ProductDetailsNutirment 
                name="Sel" 
                quantity={product.nutriments["salt_100g"]} 
                quantityUnit="g" 
                iconName="utensils"
                iconType="font-awesome-5"
                />
            <ProductDetailsNutirment 
                name="Sucre" 
                quantity={product.nutriments["sugars_100g"]} 
                quantityUnit="g" 
                iconName="candy-cane"
                iconType="font-awesome-5"
                />
            <ProductDetailsNutirment 
                name="Proteins" 
                quantity={product.nutriments["proteins_100g"]} 
                quantityUnit="g" 
                iconName="drumstick-bite"
                iconType="font-awesome-5"
                />
            <ProductDetailsNutirment 
                name="Fibre" 
                quantity={product.nutriments["fiber_100g"]} 
                quantityUnit="g"
                iconName="carrot"
                iconType="font-awesome-5"
                />
        </View>
    );
};

export default ProductDetailsNutriments;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        marginTop: 30
    }
})