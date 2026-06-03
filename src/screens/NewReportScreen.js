import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { ReportsContext } from '../context/ReportsContext';

export default function NewReportScreen({ navigation }) {
  const { addReport } = useContext(ReportsContext);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Infraestrutura');
  const [description, setDescription] = useState('');

  const categorias = ['Infraestrutura', 'Saneamento', 'Segurança', 'Saúde', 'Outros'];

  const handleSalvar = () => {
    if (!title.trim() || !description.trim()) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    addReport({ title, category, description });
    
    setTitle('');
    setDescription('');
    // Redireciona para a aba correta usando o nome interno da rota
    navigation.navigate('Não se trata de uma questão de...');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.cardContainer}>
        
        <Text style={styles.mainTitle}>Novo Relato</Text>

        {/* Campo: Título */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Título da Ocorrência</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Ex: Lixo acumulado na praça"
            placeholderTextColor="#9ca3af"
            style={styles.input}
          />
        </View>

        {/* Campo: Categoria */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Categoria</Text>
          <View style={styles.badgeContainer}>
            {categorias.map((cat) => {
              const isSelected = category === cat;
              return (
                <TouchableOpacity
                  key={cat}
                  onPress={() => setCategory(cat)}
                  style={[
                    styles.badge,
                    isSelected ? styles.badgeSelected : styles.badgeUnselected
                  ]}
                >
                  <Text style={[
                    styles.badgeText,
                    isSelected ? styles.badgeTextSelected : styles.badgeTextUnselected
                  ]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Campo: Descrição */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Descrição Detalhada</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Descreva detalhadamente o problema e informe pontos de referência..."
            placeholderTextColor="#9ca3af"
            multiline
            numberOfLines={4}
            style={[styles.input, styles.textArea]}
          />
        </View>

        {/* Botão de Enviar */}
        <TouchableOpacity onPress={handleSalvar} style={styles.button}>
          <Text style={styles.buttonText}>Enviar Relato</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6', // Fundo cinza claro idêntico ao da HomeScreen
  },
  cardContainer: {
    flex: 1,
    maxWidth: 480,
    width: '100%',
    alignSelf: 'center',
    padding: 24,
    backgroundColor: '#ffffff', // "Card" branco centralizado
    minHeight: Dimensions.get('window').height,
    // Efeito de sombra idêntico ao da lista
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 24,
    marginTop: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f9fafb', // Fundo cinza bem suave para os inputs
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb', // Bordas suaves
    color: '#1f2937',
    fontSize: 15,
  },
  textArea: {
    height: 128,
    textAlignVertical: 'top',
  },
  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  badge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9999,
    borderWidth: 1,
  },
  badgeSelected: {
    backgroundColor: '#2563eb', // Tom exato de azul do botão de envio
    borderColor: '#2563eb',
  },
  badgeUnselected: {
    backgroundColor: '#f9fafb',
    borderColor: '#e5e7eb',
  },
  badgeText: {
    fontSize: 14,
  },
  badgeTextSelected: {
    color: '#ffffff',
    fontWeight: '600',
  },
  badgeTextUnselected: {
    color: '#4b5563',
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 40,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
  },
});