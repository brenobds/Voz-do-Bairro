import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const badgeColors = {
  'Iluminação pública': 'bg-yellow-300',
  'Buraco na via': 'bg-gray-400',
  'Vazamento de água': 'bg-blue-300',
  'Foco de dengue': 'bg-red-300',
  'Outros': 'bg-green-300'
};

export default function ReportCard({ report, onPress, onDelete }) {
  const Badge = ({ children, style }) => (
    <View className={`px-2 py-1 rounded-full ${style}`}>
      <Text className="text-xs text-white">{children}</Text>
    </View>
  );

  return (
    <TouchableOpacity className="bg-white p-4 rounded-lg mb-3 shadow" onPress={onPress}>
      <View className="flex-row justify-between items-start">
        <View style={{ flex: 1 }}>
          <Text className="text-lg font-semibold text-sky-800">{report.title}</Text>
          <Text className="text-sm text-gray-600 mt-1">{report.description}</Text>
          <View className="flex-row items-center mt-3">
            <Badge style={badgeColors[report.category] || badgeColors['Outros']}>{report.category}</Badge>
            <View className="ml-3 px-2 py-1 rounded-md bg-gray-100">
              <Text className="text-xs text-gray-700">{report.status}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={onDelete} className="ml-3 px-2 py-1">
          <Text className="text-red-500">Excluir</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
