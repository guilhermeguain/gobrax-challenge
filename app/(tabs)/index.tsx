import { useEffect } from "react";
import { View, StyleSheet } from "react-native";

import { useAppDispatch } from "@/store";
import { getDrivers } from "@/store/services";

import { SelectedDriver } from "@/components/SelectedDriver";
import { DriversActions } from "@/components/DriversActions";
import { DriversTable } from "@/components/DriversTable";

export default function HomeScreen() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getDrivers());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <SelectedDriver />
        <DriversActions />
        <DriversTable />
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
