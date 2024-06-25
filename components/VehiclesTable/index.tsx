import { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { DataTable } from "react-native-paper";

import { useAppSelector } from "@/store";

import { Row } from "./components/Row";

export const VehiclesTable = () => {
  const { vehicles } = useAppSelector((state) => state.vehicle);

  const [page, setPage] = useState<number>(0);
  const [numberOfItemsPerPageList] = useState([10]);
  const [itemsPerPage, setItemsPerPage] = useState(numberOfItemsPerPageList[0]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, vehicles.length);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <DataTable style={styles.table}>
      <DataTable.Header>
        <DataTable.Title>ID</DataTable.Title>
        <DataTable.Title>Marca</DataTable.Title>
        <DataTable.Title>Placa</DataTable.Title>
        <DataTable.Title>Motorista</DataTable.Title>
      </DataTable.Header>

      {vehicles?.slice(from, to).map((vehicle) => (
        <Row key={vehicle.id} {...vehicle} />
      ))}

      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(vehicles.length / itemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} of ${vehicles.length}`}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={setItemsPerPage}
        showFastPaginationControls
        selectPageDropdownLabel={"Linhas por página"}
      />
    </DataTable>
  );
};

export const styles = StyleSheet.create({
  table: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#e7e0ec",
  },
});
