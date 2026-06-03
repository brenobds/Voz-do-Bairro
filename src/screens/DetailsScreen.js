import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { ReportsContext } from '../context/ReportsContext';

export default function DetailsScreen({ route, navigation }) {
  // Pega o ID passado por parâmetro ao clicar no card
  const { id } = route.params;
  const { reports, updateStatus, deleteReport } = useContext(ReportsContext);

  // Encontra o relato específico dentro do Context
  const report = reports.find((r) => r.id === id);

  // Se o relato não for encontrado (ex: após deletar), volta para a lista
  if (!report) {
    return (
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <Text style={styles.errorText}>Relato não encontrado ou excluído.</Text>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>Voltar para o Início</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const isPendente = report.status === 'Pendente';
  const isAnalise = report.status === 'Em Análise';

  const handleMudarStatus = () => {
    updateStatus(id);
  };

  const handleExcluir = () => {
    deleteReport(id);
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.cardContainer}>
        
        {/* Cabeçalho: Categoria e Badge de Status */}
        <View style={styles.headerRow}>
          <Text style={styles.category}>📁 {report.category}</Text>
          <View style={[
            styles.statusBadge, 
            isPendente ? styles.badgePendente : isAnalise ? styles.badgeAnalise : styles.badgeResolvido
          ]}>
            <Text style={[
              styles.statusText, 
              isPendente ? styles.textPendente : isAnalise ? styles.textAnalise : styles.textResolvido
            ]}>
              {report.status}
            </Text>
          </View>
        </View>

        {/* Conteúdo Principal */}
        <Text style={styles.title}>{report.title}</Text>
        
        <Text style={styles.label}>Descrição do problema:</Text>
        <Text style={styles.description}>{report.description}</Text>

        <Text style={styles.dateText}>
          Registrado em: {new Date(report.createdAt).toLocaleDateString('pt-BR')}
        </Text>

        {/* Divisor Visual */}
        <View style={styles.divider} />

        {/* Ações/Botões */}
        <Text style={styles.labelActions}>Ações Disponíveis</Text>
        
        <TouchableOpacity onPress={handleMudarStatus} style={styles.statusButton}>
          <Text style={styles.statusButtonText}>🔄 Avançar Status</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleExcluir} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>🗑️ Excluir Ocorrência</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  cardContainer: {
    flex: 1,
    maxWidth: 480,
    width: '100%',
    alignSelf: 'center',
    padding: 24,
    backgroundColor: '#ffffff',
    minHeight: Dimensions.get('window').height,
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  category: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4b5563',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 9999,
  },
  badgePendente: { backgroundColor: '#fef3c7' },
  badgeAnalise: { backgroundColor: '#dbeafe' },
  badgeResolvido: { backgroundColor: '#d1fae5' },
  statusText: { fontSize: 13, fontWeight: '700' },
  textPendente: { color: '#d97706' },
  textAnalise: { color: '#2563eb' },
  textResolvido: { color: '#059669' },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 8,
  },
  labelActions: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    backgroundColor: '#f9fafb',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 16,
  },
  dateText: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'right',
    marginBottom: 24,
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    verticalAlign: 'middle',
    marginBottom: 24,
  },
  statusButton: {
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#d1d5db',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  statusButtonText: {
    color: '#374151',
    fontWeight: '600',
    fontSize: 15,
  },
  deleteButton: {
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fca5a5',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#dc2626',
    fontWeight: '600',
    fontSize: 15,
  },
  errorText: {
    fontSize: 16,
    color: '#374151',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#2563eb',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});