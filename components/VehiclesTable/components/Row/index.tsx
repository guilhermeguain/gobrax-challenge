import { useCallback, useMemo } from "react";
import { Text } from "react-native";
import { DataTable, Checkbox } from "react-native-paper";

import { VehicleProps } from "@/services/jsonServer/vehicle/types";

import { useAppDispatch, useAppSelector } from "@/store";
import { VehicleActions } from "@/store/vehicle";

export const Row = (vehicle: VehicleProps) => {
  const dispatch = useAppDispatch();
  const { drivers } = useAppSelector((state) => state.driver);
  const { activeVehicle } = useAppSelector((state) => state.vehicle);

  const relatedDriver = drivers.find(
    (driver) => driver.id === vehicle.driverId
  );

  const status = useMemo(
    () => (activeVehicle?.id === vehicle.id ? "checked" : "unchecked"),
    [activeVehicle]
  );

  const handleVehicleSelect = useCallback(
    (vehicle: VehicleProps) => {
      const isSelected = activeVehicle?.id === vehicle.id;
      const updatedSelectedVehicle = isSelected ? undefined : vehicle;

      dispatch(VehicleActions.setActiveVehicle(updatedSelectedVehicle));
    },
    [activeVehicle, dispatch]
  );

  return (
    <DataTable.Row key={vehicle.id}>
      <DataTable.Cell>
        <Checkbox
          status={status}
          onPress={() => handleVehicleSelect(vehicle)}
        />
        <Text>{vehicle.id}</Text>
      </DataTable.Cell>
      <DataTable.Cell>
        <Text>{vehicle.brand}</Text>
      </DataTable.Cell>
      <DataTable.Cell>
        <Text>{vehicle.plate}</Text>
      </DataTable.Cell>
      <DataTable.Cell>
        <Text>{relatedDriver?.name}</Text>
      </DataTable.Cell>
    </DataTable.Row>
  );
};
