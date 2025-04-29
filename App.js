// App.js or your screen file
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PagerView from "react-native-pager-view";

export default function App() {
  return (
    <PagerView style={styles.pagerView} initialPage={0}>
      <View key="1" style={styles.page}>
        <Text style={styles.text}>Page 1: Info A</Text>
      </View>
      <View key="2" style={styles.page}>
        <Text style={styles.text}>Page 2: Info B</Text>
      </View>
    </PagerView>
  );
}

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
  },
  text: {
    fontSize: 24,
  },
});
