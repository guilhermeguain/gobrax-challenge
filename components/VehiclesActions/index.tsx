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
import { createVehicle, deleteVehicle, updateVehicle } from "@/store/services";

import { When } from "@/components/shared/When";

import { VehicleForm } from "@/components/VehicleForm";
import { VehicleFormSchemaProps } from "@/components/VehicleForm/types";

import { SnackBarProps } from "./types";
import { FieldErrors } from "react-hook-form";

export const VehiclesActions = () => {
  const dispatch = useAppDispatch();

  const { activeVehicle } = useAppSelector((state) => state.vehicle);

  const [activeModal, setActiveModal] = useState<
    "create" | "update" | undefined
  >();
  const [snackBar, setSnackBar] = useState<SnackBarProps>({
    message: "",
    isVisible: false,
    color: "green",
  });

  const handleVehicleCreateSuccess = useCallback(
    (vehicle: VehicleFormSchemaProps) => {
      dispatch(createVehicle({ ...vehicle, driverId: "" }));
      setActiveModal(undefined);
      setSnackBar({
        message: "Veículo adicionado com sucesso!",
        isVisible: true,
        color: "green",
      });
    },
    [dispatch, setActiveModal, setSnackBar]
  );

  const handleVehicleCreateError = useCallback(
    (errors: FieldErrors<VehicleFormSchemaProps>) => {
      console.log(errors, "errors");
    },
    []
  );

  const handleVehicleUpdateSuccess = useCallback(
    (vehicle: VehicleFormSchemaProps) => {
      dispatch(updateVehicle(vehicle));
      setActiveModal(undefined);
      setSnackBar({
        message: "Veículo atualizado com sucesso!",
        isVisible: true,
        color: "green",
      });
    },
    [dispatch, setActiveModal, setSnackBar]
  );

  const handleVehicleDelete = useCallback(() => {
    if (!activeVehicle?.id) return;

    dispatch(deleteVehicle(activeVehicle.id));
    setSnackBar({
      message: "Veículo removido com sucesso!",
      isVisible: true,
      color: "red",
    });
  }, [dispatch, activeVehicle]);

  return (
    <>
      <Portal>
        <Modal
          visible={activeModal === "create"}
          onDismiss={() => setActiveModal(undefined)}
          contentContainerStyle={styles.modal}
        >
          <VehicleForm
            title="Adicionar novo veículo"
            onSuccess={handleVehicleCreateSuccess}
            onError={handleVehicleCreateError}
          />
        </Modal>
        <Modal
          visible={activeModal === "update"}
          onDismiss={() => setActiveModal(undefined)}
          contentContainerStyle={styles.modal}
        >
          <VehicleForm
            title="Atualizar veículo"
            onSuccess={handleVehicleUpdateSuccess}
            onError={handleVehicleCreateError}
            defaultValues={activeVehicle}
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
        <When value={!!activeVehicle}>
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
            onPress={handleVehicleDelete}
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
