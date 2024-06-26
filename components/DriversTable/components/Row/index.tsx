import { useCallback, useMemo } from "react";
import { Text, StyleSheet, View } from "react-native";
import { DataTable, Checkbox } from "react-native-paper";

import { DriverProps } from "@/services/jsonServer/driver/types";

import { useAppDispatch, useAppSelector } from "@/store";
import { DriverActions } from "@/store/driver";

export const Row = (driver: DriverProps) => {
  const dispatch = useAppDispatch();
  const { activeDriver } = useAppSelector((state) => state.driver);

  const status = useMemo(
    () => (activeDriver?.id === driver.id ? "checked" : "unchecked"),
    [driver, activeDriver]
  );

  const hasVehicles = driver?.vehicles?.length;

  const hasVehiclesText = hasVehicles ? "Sim" : "Não";

  const handleDriverSelect = useCallback(
    (driver: DriverProps) => {
      const isSelected = activeDriver?.id === driver.id;
      const updatedSelectedDriver = isSelected ? undefined : driver;

      dispatch(DriverActions.setActiveDriver(updatedSelectedDriver));
    },
    [activeDriver, dispatch]
  );

  return (
    <DataTable.Row key={driver.id}>
      <DataTable.Cell>
        <View style={styles.cell}>
          <Checkbox
            status={status}
            onPress={() => handleDriverSelect(driver)}
          />
          <Text>{driver.id}</Text>
        </View>
      </DataTable.Cell>
      <DataTable.Cell>
        <Text>{driver.name}</Text>
      </DataTable.Cell>
      <DataTable.Cell numeric>
        <Text>{driver.document}</Text>
      </DataTable.Cell>
      <DataTable.Cell numeric>
        <Text>{hasVehiclesText}</Text>
      </DataTable.Cell>
    </DataTable.Row>
  );
};

const styles = StyleSheet.create({
  cell: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
});
