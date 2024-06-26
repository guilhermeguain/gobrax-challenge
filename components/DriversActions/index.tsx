import { useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import {
  Modal,
  Portal,
  IconButton,
  MD3Colors,
  Snackbar,
} from "react-native-paper";
import { FieldErrors } from "react-hook-form";

import { DriverProps } from "@/services/jsonServer/driver/types";
import { VehicleProps } from "@/services/jsonServer/vehicle/types";

import { useAppDispatch, useAppSelector } from "@/store";
import { DriverActions } from "@/store/driver";
import { createDriver, deleteDriver, updateDriver } from "@/store/services";

import { When } from "@/components/shared/When";

import { DriverForm } from "@/components/DriverForm";
import { DriverFormSchemaProps } from "@/components/DriverForm/types";

import { SnackBarProps } from "./types";

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
    ({ id, ...driver }: DriverFormSchemaProps) => {
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
    (driver: DriverFormSchemaProps) => {
      const previousVehicles = activeDriver?.vehicles;
      const removedVehicles =
        previousVehicles?.filter(
          (previousVehicle) => !driver.vehicles.includes(previousVehicle)
        ) ?? [];

      const updatedVehicles: VehicleProps[] = !driver.vehicles.length
        ? removedVehicles.map((removedVehicle) => ({
            ...removedVehicle,
            driverId: "",
          }))
        : driver?.vehicles.map((vehicle) => ({
            ...vehicle,
            driverId: driver.id,
          }));

      const updatedDriver: DriverProps = {
        ...driver,
        vehicles: updatedVehicles,
      };

      dispatch(updateDriver(updatedDriver));

      setActiveModal(undefined);
      setSnackBar({
        message: "Motorista atualizado com sucesso!",
        isVisible: true,
        color: "green",
      });
    },
    [dispatch, activeDriver, setActiveModal, setSnackBar]
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
        <IconButton
          icon="plus"
          iconColor={MD3Colors.neutralVariant20}
          mode="contained"
          size={20}
          onPress={() => setActiveModal("create")}
        />
        <When value={!!activeDriver}>
          <IconButton
            icon="pencil"
            iconColor={MD3Colors.neutralVariant20}
            mode="contained"
            size={20}
            onPress={() => setActiveModal("update")}
          />
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
    gap: 8,
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
