import React, { createContext, useState, useEffect } from 'react';
import { Platform } from 'react-native';
import * as SQLite from 'expo-sqlite';

export const ReportsContext = createContext();

// PROTEÇÃO: Só ativa o banco de dados se NÃO estiver rodando no navegador
const db = Platform.OS !== 'web' ? SQLite.openDatabase('voz_do_bairro.db') : null;

export function ReportsProvider({ children }) {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    if (db) {
      initDB();
    } else {
    
      setReports([
        {
          id: '1',
          title: 'Iluminação Pública Quebrada',
          category: 'Infraestrutura',
          description: 'Poste apagado na rua principal desde a semana passada.',
          status: 'Pendente',
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Vazamento de Água',
          category: 'Saneamento',
          description: 'Cano estourado na calçada vertendo muita água.',
          status: 'Em Análise',
          createdAt: new Date().toISOString()
        }
      ]);
    }
  }, []);

  function initDB() {
    if (!db) return; 

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
    if (!db) return; // Trava para a Web

    db.transaction(tx => {
      tx.executeSql('SELECT * FROM reports ORDER BY createdAt DESC', [], (_, { rows }) => {
        setReports(rows._array || []);
      });
    });
  }

  function addReport({ title, category, description }) {
    const id = Date.now().toString();
    const createdAt = new Date().toISOString();

    if (!db) {
     
      const newReport = { id, title, category, description, status: 'Pendente', createdAt };
      setReports(prev => [newReport, ...prev]);
      return;
    }

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
    if (!db) {
      
      setReports(prev => prev.filter(report => report.id !== id));
      return;
    }

    db.transaction(tx => {
      tx.executeSql('DELETE FROM reports WHERE id = ?;', [id], () => { loadReports(); });
    });
  }

  function updateStatus(id) {
    const order = ['Pendente', 'Em Análise', 'Resolvido'];

    if (!db) {
      // Se for Web, simula a mudança de status na memória
      setReports(prev => prev.map(report => {
        if (report.id === id) {
          const idx = order.indexOf(report.status);
          const next = order[(idx + 1) % order.length];
          return { ...report, status: next };
        }
        return report;
      }));
      return;
    }

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