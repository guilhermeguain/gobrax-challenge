import { useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import {
  Modal,
  Portal,
  Button,
  IconButton,
  MD3Colors,
  Snackbar,
} from "react-native-paper";

import { useAppDispatch, useAppSelector } from "@/store";
import { DriverActions } from "@/store/driver";
import { createDriver, deleteDriver, updateDriver } from "@/store/services";

import { When } from "@/components/shared/When";

import { DriverForm } from "@/components/DriverForm";

import { SnackBarProps } from "./types";
import { DriverProps } from "@/services/jsonServer/driver/types";
import { VehicleProps } from "@/services/jsonServer/vehicle/types";
import { FieldErrors } from "react-hook-form";
import { DriverFormSchemaProps } from "../DriverForm/types";

export const DriversActions = () => {
  const dispatch = useAppDispatch();

  const { activeDriver } = useAppSelector((state) => state.driver);

  const [activeModal, setActiveModal] = useState<
    "create" | "update" | undefined
  >();
  const [snackBar, setSnackBar] = useState<SnackBarProps>({
    message: "",
    isVisible: false,
    color: "green",
  });

  const handleDriverCreateSuccess = useCallback(
    ({ name, document, vehicle }: DriverFormSchemaProps) => {
      const vehicles: VehicleProps[] = vehicle ? [vehicle] : [];

      const driver: Exclude<DriverProps, "id"> = {
        name,
        document,
        vehicles,
      };

      dispatch(createDriver(driver));
      setActiveModal(undefined);
      setSnackBar({
        message: "Motorista adicionado com sucesso!",
        isVisible: true,
        color: "green",
      });
    },
    [dispatch, setActiveModal, setSnackBar]
  );

  const handleDriverCreateError = useCallback(
    (errors: FieldErrors<DriverFormSchemaProps>) => {
      console.log(errors, "errors");
    },
    []
  );

  const handleDriverUpdateSuccess = useCallback(
    ({ id, name, document, vehicle }: DriverFormSchemaProps) => {
      const vehicles: VehicleProps[] = vehicle ? [vehicle] : [];

      const driver: Exclude<DriverProps, "id"> = {
        id,
        name,
        document,
        vehicles,
      };

      dispatch(updateDriver(driver));
      setActiveModal(undefined);
      setSnackBar({
        message: "Motorista atualizado com sucesso!",
        isVisible: true,
        color: "green",
      });
    },
    [dispatch, setActiveModal, setSnackBar]
  );

  const handleDriverDelete = useCallback(() => {
    if (!activeDriver?.id) return;

    dispatch(deleteDriver(activeDriver.id));
    dispatch(DriverActions.setActiveDriver(undefined));
    setSnackBar({
      message: "Motorista removido com sucesso!",
      isVisible: true,
      color: "red",
    });
  }, [dispatch, activeDriver]);

  return (
    <>
      <Portal>
        <Modal
          visible={activeModal === "create"}
          onDismiss={() => setActiveModal(undefined)}
          contentContainerStyle={styles.modal}
        >
          <DriverForm
            title="Adicionar novo motorista"
            onSuccess={handleDriverCreateSuccess}
            onError={handleDriverCreateError}
          />
        </Modal>
        <Modal
          visible={activeModal === "update"}
          onDismiss={() => setActiveModal(undefined)}
          contentContainerStyle={styles.modal}
        >
          <DriverForm
            title="Atualizar motorista"
            onSuccess={handleDriverUpdateSuccess}
            onError={handleDriverCreateError}
            defaultValues={activeDriver}
          />
        </Modal>
        <Snackbar
          visible={snackBar?.isVisible}
          onDismiss={() =>
            setSnackBar((state) => ({ ...state, isVisible: false }))
          }
          duration={3000}
          theme={{
            colors: {
              inverseSurface: snackBar.color,
            },
          }}
        >
          {snackBar?.message}
        </Snackbar>
      </Portal>
      <View style={styles.container}>
        <Button
          mode="contained"
          onPress={() => setActiveModal("create")}
          textColor="#000"
        >
          Adicionar motorista
        </Button>
        <When value={!!activeDriver}>
          <Button
            mode="contained"
            onPress={() => setActiveModal("update")}
            textColor="#000"
          >
            Editar motorista
          </Button>
          <IconButton
            icon="trash-can"
            iconColor={MD3Colors.error50}
            mode="contained"
            size={20}
            onPress={handleDriverDelete}
          />
        </When>
      </View>
    </>
  );
};

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    minHeight: 48,
  },
  modal: {
    margin: "auto",
    borderRadius: 8,
    backgroundColor: "#fff",
    width: "100%",
    maxWidth: 1280,
    padding: 20,
  },
});
