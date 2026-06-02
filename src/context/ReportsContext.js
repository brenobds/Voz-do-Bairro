import React, { createContext, useState, useEffect } from 'react';
import * as SQLite from 'expo-sqlite';

export const ReportsContext = createContext();

const db = SQLite.openDatabase('voz_do_bairro.db');

export function ReportsProvider({ children }) {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    initDB();
  }, []);

  function initDB() {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS reports (
          id TEXT PRIMARY KEY NOT NULL,
          title TEXT,
          category TEXT,
          description TEXT,
          status TEXT,
          createdAt TEXT
        );`
      );
    }, (e) => {
      console.warn('Erro ao criar tabela', e);
    }, loadReports);
  }

  function loadReports() {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM reports ORDER BY createdAt DESC', [], (_, { rows }) => {
        setReports(rows._array);
      });
    });
  }

  function addReport({ title, category, description }) {
    const id = Date.now().toString();
    const createdAt = new Date().toISOString();
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO reports (id, title, category, description, status, createdAt) VALUES (?, ?, ?, ?, ?, ?);',
        [id, title, category, description, 'Pendente', createdAt],
        () => { loadReports(); },
        (_, err) => { console.warn('Insert erro', err); return false; }
      );
    });
  }

  function deleteReport(id) {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM reports WHERE id = ?;', [id], () => { loadReports(); });
    });
  }

  function updateStatus(id) {
    const order = ['Pendente', 'Em Análise', 'Resolvido'];
    db.transaction(tx => {
      tx.executeSql('SELECT status FROM reports WHERE id = ?;', [id], (_, { rows }) => {
        if (rows.length === 0) return;
        const current = rows._array[0].status;
        const idx = order.indexOf(current);
        const next = order[(idx + 1) % order.length];
        tx.executeSql('UPDATE reports SET status = ? WHERE id = ?;', [next, id], () => { loadReports(); });
      });
    });
  }

  return (
    <ReportsContext.Provider value={{ reports, addReport, deleteReport, updateStatus }}>
      {children}
    </ReportsContext.Provider>
  );
}
