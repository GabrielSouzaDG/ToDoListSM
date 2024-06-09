import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
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
                value={descricao}
                onChangeText={setDescricao}
            />
            <Button
                title="Salvar Tarefa"
                onPress={handleAddTarefa}
                disabled={!descricao.trim()} // Desabilita o botão se a descrição estiver vazia
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center', // Centraliza os elementos verticalmente
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
    },
});

export default CriarTarefas;