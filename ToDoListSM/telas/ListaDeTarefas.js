import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CheckBox from 'expo-checkbox';
import { getTarefas, updateTarefa } from '../database/database';

const ListaDeTarefas = () => {
    const [tarefas, setTarefas] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', loadTarefas);
        return unsubscribe;
    }, [navigation]);

    const loadTarefas = async () => {
        const tarefasData = await getTarefas();
        setTarefas(tarefasData);
    };

    const toggleTarefa = async (id, concluida) => {
        await updateTarefa(id, concluida ? 0 : 1);
        loadTarefas();
    };

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <CheckBox
                value={item.concluida === 1}
                onValueChange={() => toggleTarefa(item.id, item.concluida)}
            />
            <Text style={[styles.text, item.concluida === 1 ? styles.concluida : null]}>{item.descricao}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={tarefas}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            />
            <Button
                title="Adicionar Tarefa"
                onPress={() => navigation.navigate('Cadastrar atividade')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    text: {
        marginLeft: 10,
    },
    concluida: {
        textDecorationLine: 'line-through',
    },
});

export default ListaDeTarefas;