import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const CustomComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        This is a custom component inside the PDF!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    border: "1pt solid black",
  },
  text: {
    fontSize: 14,
  },
});

export default CustomComponent;
