import { useState, useEffect } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { useMediaQuery } from "responsive-native";
import { DataTable } from "react-native-paper";

import { useAppSelector } from "@/store";

import { When } from "@/components/shared/When";

import { Row } from "./components/Row";

export const DriversTable = () => {
  const isDesktop = useMediaQuery({
    minBreakpoint: "md",
  });

  return (
    <>
      <When value={!isDesktop}>
        <ScrollView horizontal>
          <Table />
        </ScrollView>
      </When>
      <When value={isDesktop}>
        <Table />
      </When>
    </>
  );
};

export const styles = StyleSheet.create({
  table: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#e7e0ec",
  },
});

const Table = () => {
  const { drivers } = useAppSelector((state) => state.driver);

  const [page, setPage] = useState<number>(0);
  const [numberOfItemsPerPageList] = useState([10]);
  const [itemsPerPage, setItemsPerPage] = useState(numberOfItemsPerPageList[0]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, drivers.length);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <DataTable style={styles.table}>
      <DataTable.Header>
        <DataTable.Title>ID</DataTable.Title>
        <DataTable.Title>Nome</DataTable.Title>
        <DataTable.Title numeric>Documento</DataTable.Title>
        <DataTable.Title numeric>Vínculo</DataTable.Title>
      </DataTable.Header>

      {drivers?.slice(from, to).map((driver) => (
        <Row key={driver.id} {...driver} />
      ))}

      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(drivers.length / itemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} of ${drivers.length}`}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={setItemsPerPage}
        showFastPaginationControls
        selectPageDropdownLabel={"Linhas por página"}
      />
    </DataTable>
  );
};
