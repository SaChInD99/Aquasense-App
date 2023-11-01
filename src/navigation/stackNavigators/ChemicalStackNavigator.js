import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ChemicalPredictionScreen from '../../screens/chemical/chemicalPrediction';
import ChemicalDetails from '../../screens/chemical/ChemicalDetails';
import ChemicalCalculation from '../../screens/chemical/ChemicalCalculation';


const Stack = createNativeStackNavigator();

const ChemicalsStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="chemicalAdd" component={ChemicalPredictionScreen} />
            <Stack.Screen name="chemicalDetails" component={ChemicalDetails} />
            <Stack.Screen name="chemicalCalc" component={ChemicalCalculation} />

        </Stack.Navigator>
    );
};

export default ChemicalsStackNavigator;