import { useEffect } from "react";
import { View, StyleSheet } from "react-native";

import { useAppDispatch, useAppSelector } from "@/store";
import { getVehicles } from "@/store/services";

import { SelectedDriver } from "@/components/SelectedDriver";
import { VehiclesActions } from "@/components/VehiclesActions";
import { VehiclesTable } from "@/components/VehiclesTable";

export default function VehiclesScreen() {
  const dispatch = useAppDispatch();

  const { drivers } = useAppSelector((state) => state.driver);

  useEffect(() => {
    dispatch(getVehicles());
  }, [dispatch, drivers]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <SelectedDriver />
        <VehiclesActions />
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
