import { Text } from "react-native";
import { DataTable } from "react-native-paper";

import { VehicleProps } from "@/services/jsonServer/vehicle/types";

export const Row = (driver: VehicleProps) => {
  return (
    <DataTable.Row key={driver.id}>
      <DataTable.Cell>
        <Text>{driver.id}</Text>
      </DataTable.Cell>
      <DataTable.Cell>
        <Text>{driver.brand}</Text>
      </DataTable.Cell>
      <DataTable.Cell>
        <Text>{driver.plate}</Text>
      </DataTable.Cell>
    </DataTable.Row>
  );
};
