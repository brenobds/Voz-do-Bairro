import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { ReportsContext } from '../context/ReportsContext';

export default function DetailsScreen({ route, navigation }) {
  const { id } = route.params;
  const { reports, updateStatus, deleteReport } = useContext(ReportsContext);
  const report = reports.find(r => r.id === id);

  if (!report) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <Text className="text-gray-500">Relato não encontrado.</Text>
      </View>
    );
  }

  function handleChangeStatus() {
    updateStatus(id);
    Alert.alert('Status atualizado', `Novo status: ${reports.find(r=>r.id===id)?.status || 'Atualizado'}`);
  }

  function handleDelete() {
    Alert.alert('Excluir relato', 'Tem certeza?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: ()=>{ deleteReport(id); navigation.navigate('Início'); } }
    ]);
  }

  return (
    <View className="flex-1 bg-gray-50 p-4">
      <Text className="text-2xl font-bold text-sky-800 mb-2">{report.title}</Text>
      <Text className="text-sm text-gray-600 mb-4">Categoria: {report.category}</Text>
      <Text className="text-gray-700 mb-6">{report.description}</Text>

      <View className="flex-row space-x-3">
        <TouchableOpacity onPress={handleChangeStatus} className="bg-sky-600 py-3 px-4 rounded-md">
          <Text className="text-white">Mudar Status</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete} className="bg-red-500 py-3 px-4 rounded-md">
          <Text className="text-white">Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
