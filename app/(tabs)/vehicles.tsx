import { useEffect } from "react";
import { View, StyleSheet } from "react-native";

import { useAppDispatch } from "@/store";
import { getVehicles } from "@/store/services";

import { SelectedDriver } from "@/components/SelectedDriver";
import { VehiclesTable } from "@/components/VehiclesTable";

export default function VehiclesScreen() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getVehicles());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <SelectedDriver />
        <VehiclesTable />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  content: {
    padding: 16,
    width: "100%",
    flex: 1,
    gap: 16,
    maxWidth: 1280,
  },
});
