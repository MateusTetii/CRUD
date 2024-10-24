const db = require('../config/db');
const bcrypt = require('bcrypt');

const User = {
    create: async (user) => {
        const hashPassword = await bcrypt.hash(user.password, 10); // Criptografando senha
        const query = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
        const [results] = await db.query(query, [user.username, hashPassword, user.role]);
        return results.insertId;
    },

    findById: async (id) => {
        const query = 'SELECT * FROM users WHERE id = ?';
        const [results] = await db.query(query, [id]);
        return results[0];
    },

    findByUsername: async (username) => {
        const query = 'SELECT * FROM users WHERE username = ?';
        const [results] = await db.query(query, [username]);
        return results[0];
    },

    update: async (id, user) => {
        const hashPassword = await bcrypt.hash(user.password, 10);
        const query = 'UPDATE users SET username = ?, password = ?, role = ? WHERE id = ?';
        const [results] = await db.query(query, [user.username, hashPassword, user.role, id]);
        return results;
    },

    delete: async (id) => {
        const query = 'DELETE FROM users WHERE id = ?';
        const [results] = await db.query(query, [id]);
        return results;
    },

    getAll: async () => {
        const query = 'SELECT * FROM users';
        const [results] = await db.query(query);
        return results;
    },

    searchByName: async (name) => {
        const query = 'SELECT * FROM users WHERE username LIKE ?';
        const [results] = await db.query(query, [`%${name}%`]);
        return results;
    },
};

module.exports = User;
