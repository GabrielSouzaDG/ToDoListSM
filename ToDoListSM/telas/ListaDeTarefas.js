import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
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
                style={styles.checkbox}
            />
            <Text style={[styles.text, item.concluida === 1 ? styles.concluida : null]}>
                {item.descricao}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={tarefas}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
            />
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('Cadastrar atividade')}
            >
                <Text style={styles.addButtonText}>Adicionar Tarefa</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0', // Cor de fundo para a tela
        padding: 20,
    },
    list: {
        paddingBottom: 20,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#fff', // Cor de fundo para os itens
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    checkbox: {
        marginRight: 10,
    },
    text: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    concluida: {
        textDecorationLine: 'line-through',
        color: '#999',
    },
    addButton: {
        backgroundColor: '#007BFF', // Cor de fundo para o botão
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    addButtonText: {
        color: '#fff', // Cor do texto do botão
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ListaDeTarefas;