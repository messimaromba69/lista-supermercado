import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

const App = () => {

  useEffect(() => {
    const loadItems = async () => {
    const storedItems = await AsyncStorage.getItem('supermarketList');
    if (storedItems) {
    setItems(JSON.parse(storedItems));
    }
    };
    loadItems();
   }, []);

   const addItem = async () => {
    if (item.trim()) {
    const newItems = [...items, item];
    setItems(newItems);
    setItem('');
    await AsyncStorage.setItem('supermarketList', JSON.stringify(newItems));
    }
   };
   
   const removeItem = async (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    await AsyncStorage.setItem('supermarketList', JSON.stringify(newItems));
   };
   
 const [item, setItem] = useState('');
 const [items, setItems] = useState([]);
 const renderItem = ({ item, index }) => (
 <View style={styles.item}>
 <Text>{item}</Text>
 <TouchableOpacity onPress={() => removeItem(index)} style={styles.removeButton}>
 <Text style={styles.removeButtonText}>Remover</Text>
 </TouchableOpacity>
 </View>
 );

 return (
 <View style={styles.container}>
 <Text style={styles.title}>Lista de Supermercado</Text>
 <TextInput
 style={styles.input}
 placeholder="Adicione um item"
 value={item}
 onChangeText={setItem}
 />
    <Button title="Adicionar" onPress={addItem} />
    {items.length === 0 ? (
      <Text style={styles.emptyMessage}>Lista vazia</Text>
    ) : (
      <Text style={styles.itemQuantidade}>Total de itens: {items.length}</Text>
    )}
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
 </View>
 );
};
const styles = StyleSheet.create({
 container: {
 flex: 1,
 padding: 20,
 backgroundColor: '#fff',
 },
 title: {
 fontSize: 24,
 marginBottom: 20,
 },
 input: {
 borderWidth: 1,
 borderColor: '#ccc',
 padding: 10,
 marginBottom: 10,
 },
 item: {
 flexDirection: 'row',
 justifyContent: 'space-between',
 alignItems: 'center',
 padding: 15,
 borderBottomWidth: 1,
 borderBottomColor: '#ccc',
 },
 removeButton: {
 backgroundColor: '#ff4d4d',
 padding: 5,
 borderRadius: 5,
 },
 removeButtonText: {
 color: '#fff',
 },
});
export default App;