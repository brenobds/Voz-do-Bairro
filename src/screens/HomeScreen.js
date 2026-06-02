import React, { useContext } from 'react';
import { View, FlatList, Text } from 'react-native';
import { ReportsContext } from '../context/ReportsContext';
import ReportCard from '../components/ReportCard';

export default function HomeScreen({ navigation }) {
  const { reports, deleteReport } = useContext(ReportsContext);

  return (
    <View className="flex-1 bg-gray-50 p-4">
      {reports.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-400">Nenhum relato ainda. Seja o primeiro!</Text>
        </View>
      ) : (
        <FlatList
          data={reports}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ReportCard
              report={item}
              onPress={() => navigation.navigate('Detalhes', { id: item.id })}
              onDelete={() => deleteReport(item.id)}
            />
          )}
        />
      )}
    </View>
  );
}
