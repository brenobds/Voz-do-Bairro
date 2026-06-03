import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ReportCard({ report, onPress, onDelete }) {
  // Define a cor da etiqueta de status
  const isPendente = report.status === 'Pendente';

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{report.title}</Text>
        <View style={[styles.statusBadge, isPendente ? styles.badgePendente : styles.badgeAnalise]}>
          <Text style={[styles.statusText, isPendente ? styles.textPendente : styles.textAnalise]}>
            {report.status}
          </Text>
        </View>
      </View>

      <Text style={styles.description} numberOfLines={2}>
        {report.description}
      </Text>

      <View style={styles.footerRow}>
        <Text style={styles.categoryTag}>📁 {report.category}</Text>
        
        <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
          <Text style={styles.deleteText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgePendente: {
    backgroundColor: '#fef3c7', // Amarelo claro
  },
  badgeAnalise: {
    backgroundColor: '#dbeafe', // Azul claro
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  textPendente: {
    color: '#d97706',
  },
  textAnalise: {
    color: '#2563eb',
  },
  description: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 12,
    lineHeight: 20,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    paddingTop: 10,
  },
  categoryTag: {
    fontSize: 13,
    color: '#6b7280',
    fontWeight: '500',
  },
  deleteButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  deleteText: {
    color: '#ef4444',
    fontWeight: '600',
    fontSize: 13,
  },
});