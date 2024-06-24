import { Link } from "expo-router";
import { View, StyleSheet, Text } from "react-native";

export const Menu = () => {
  return (
    <View style={styles.container}>
      <Link href="/" style={styles.link}>
        <Text>Motoristas</Text>
      </Link>
      <Link href="/vehicles" style={styles.link}>
        <Text>Veículos</Text>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 32,
  },
  link: {
    color: "#000",
    fontWeight: "bold",
  },
});
