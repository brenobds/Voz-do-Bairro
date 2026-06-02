import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ReportsContext } from '../context/ReportsContext';

const categories = ['Iluminação pública', 'Buraco na via', 'Vazamento de água', 'Foco de dengue', 'Outros'];

export default function NewReportScreen({ navigation }) {
  const { addReport } = useContext(ReportsContext);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [description, setDescription] = useState('');

  function handleSend() {
    if (!title.trim() || !description.trim()) {
      Alert.alert('Preencha título e descrição');
      return;
    }
    addReport({ title: title.trim(), category, description: description.trim() });
    setTitle(''); setDescription(''); setCategory(categories[0]);
    navigation.navigate('Início');
  }

  return (
    <View className="flex-1 bg-gray-50 p-4">
      <Text className="text-sm text-gray-700 mb-2">Título do Problema</Text>
      <TextInput value={title} onChangeText={setTitle} placeholder="Ex: Poste sem iluminação" className="bg-white p-3 rounded-md mb-4" />

      <Text className="text-sm text-gray-700 mb-2">Categoria</Text>
      <View className="bg-white rounded-md mb-4">
        <Picker selectedValue={category} onValueChange={v => setCategory(v)}>
          {categories.map(c => <Picker.Item label={c} value={c} key={c} />)}
        </Picker>
      </View>

      <Text className="text-sm text-gray-700 mb-2">Descrição detalhada</Text>
      <TextInput value={description} onChangeText={setDescription} placeholder="Descreva o problema com detalhes" className="bg-white p-3 rounded-md h-40 text-gray-700 mb-4" multiline />

      <TouchableOpacity onPress={handleSend} className="bg-sky-600 py-3 rounded-md items-center">
        <Text className="text-white font-semibold">Enviar Relato</Text>
      </TouchableOpacity>
    </View>
  );
}
