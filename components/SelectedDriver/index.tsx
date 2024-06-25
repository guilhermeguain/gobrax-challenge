import { View, Text, StyleSheet } from "react-native";

import { useAppSelector } from "@/store";

import { When } from "@/components/shared/When";

export const SelectedDriver = () => {
  const { activeDriver } = useAppSelector((state) => state.driver);

  const vehicles = activeDriver?.vehicles;
  const vehicle = vehicles?.[0] ? vehicles[0] : undefined;
  const isValidVehicle = !!vehicle?.brand && !!vehicle.plate;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.row}>
          <Text>Selecionado:</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Motorista:</Text>
          <Text>{activeDriver?.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Veículo:</Text>
          <When value={isValidVehicle}>
            <Text>{`${vehicle?.brand} - ${vehicle?.plate}`}</Text>
          </When>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-end",
  },
  content: {},
  row: {
    flexDirection: "row",
    gap: 8,
  },
  label: {
    fontWeight: "bold",
  },
});
