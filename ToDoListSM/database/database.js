import * as SQLite from 'expo-sqlite';

let db;

export function openDatabase() {
    if (!db) {
        db = SQLite.openDatabaseSync("tarefas");
    }
    db.execSync('CREATE TABLE IF NOT EXISTS tarefas (id INTEGER PRIMARY KEY NOT NULL, descricao TEXT, concluida INT);');
}

export async function addTarefa(descricao) {
    try {
        openDatabase();
        const params = [descricao, 0];
        return await db.runAsync("INSERT INTO tarefas (descricao, concluida) VALUES (?, ?)", params);
    } catch (error) {
        console.error("Error adding tarefa:", error);
        throw error;
    }
}

export async function getTarefas() {
    openDatabase();
    return await db.getAllAsync("SELECT * FROM tarefas");
}

export async function updateTarefa(id, concluida) {
    openDatabase();
    const params = [concluida, id];
    return await db.runAsync("UPDATE tarefas SET concluida = ? WHERE id = ?", params);
}