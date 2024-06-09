import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { addTarefa } from '../database/database';

const CriarTarefas = () => {
    const [descricao, setDescricao] = useState('');
    const navigation = useNavigation();

    const handleAddTarefa = async () => {
        if (descricao.trim()) {
            await addTarefa(descricao);
            navigation.goBack();
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Descrição da Tarefa"
                placeholderTextColor="#999"
                value={descricao}
                onChangeText={setDescricao}
            />
            <TouchableOpacity
                style={styles.saveButton}
                onPress={handleAddTarefa}
                disabled={!descricao.trim()}
            >
                <Text style={styles.saveButtonText}>Salvar Tarefa</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7', // Cor de fundo para a tela
        padding: 20,
        justifyContent: 'center', // Centraliza os elementos verticalmente
    },
    input: {
        height: 50,
        backgroundColor: '#fff', // Cor de fundo para o campo de entrada
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        padding: 15,
        fontSize: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    saveButton: {
        backgroundColor: '#28a745', // Cor de fundo para o botão
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    saveButtonText: {
        color: '#fff', // Cor do texto do botão
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CriarTarefas;
