import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

export function ItemCard() {
  const [Items, ItemsState] = useState();

  return (
    <View style={styles.container}>
      <View style={styles.box1}>
        <Text>Tomato</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: '#f0f0f0',
    },
    box1: {
      flex: 1,
      width: '100%',
      backgroundColor: '#4CAF50',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
    },
  });