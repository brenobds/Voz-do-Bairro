import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { ReportsContext } from '../context/ReportsContext';
import ReportCard from '../components/ReportCard';

export default function HomeScreen({ navigation }) {
  const { reports, deleteReport } = useContext(ReportsContext);

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        
        <Text style={styles.mainTitle}>Relatos Comunitários</Text>

        {reports.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum relato ainda. Seja o primeiro!</Text>
          </View>
        ) : (
          <FlatList
            data={reports}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6', // bg-gray-100
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
  mainTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 20,
    marginTop: 16,
  },
  listContent: {
    paddingBottom: 40,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: '#9ca3af', // text-gray-400
    textAlign: 'center',
  },
});