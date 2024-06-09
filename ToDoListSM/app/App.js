import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListaDeTarefas from '../telas/ListaDeTarefas';
import CriarTarefas from '../telas/CriarTarefas';
import { openDatabase } from '../database/database';

const Stack = createStackNavigator();

const App = () => {
    useEffect(() => {
        const initializeDatabase = async () => {
            await openDatabase();
        };
        initializeDatabase();
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="To Do List">
                <Stack.Screen name="To Do List" component={ListaDeTarefas} />
                <Stack.Screen name="Cadastrar atividade" component={CriarTarefas} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;