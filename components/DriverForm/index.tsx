import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Text, Button, TextInput, HelperText } from "react-native-paper";
import { PaperSelect } from "react-native-paper-select";

import { useAppDispatch, useAppSelector } from "@/store";
import { getVehicles } from "@/store/services";

import { driverFormSchema } from "./schemas";
import { DriverFormSchemaProps, DriverFormProps } from "./types";

export const DriverForm = ({
  title,
  defaultValues,
  onSuccess,
  onError,
}: DriverFormProps) => {
  const dispatch = useAppDispatch();

  const [selectedVehicles, setSelectedVehicles] = useState<
    { _id: string; value: string }[]
  >(() => {
    const defaultVehicles = defaultValues?.vehicles ?? [];

    return defaultVehicles?.map((vehicle) => ({
      _id: vehicle?.id ?? "",
      value: `${vehicle?.brand} (${vehicle?.plate})`,
    }));
  });

  const methods = useForm<DriverFormSchemaProps>({
    resolver: zodResolver(driverFormSchema),
    defaultValues: {
      id: "",
      vehicles: [],
      ...defaultValues,
    },
  });

  const { control, setValue, resetField, handleSubmit } = methods;

  const { vehicles } = useAppSelector((state) => state.vehicle);

  useEffect(() => {
    dispatch(getVehicles());
  }, [getVehicles]);

  return (
    <FormProvider {...methods}>
      <View>
        <Text variant="headlineMedium">{title}</Text>
        <Controller
          control={control}
          name="name"
          render={({
            field: { value = "", ...rest },
            fieldState: { error },
          }) => (
            <TextInput
              mode="outlined"
              value={value}
              label="Nome*"
              error={!!error}
              style={styles.input}
              onChangeText={rest.onChange}
              {...rest}
            />
          )}
        />
        <Controller
          control={control}
          name="document"
          render={({
            field: { value = "", ...rest },
            fieldState: { error },
          }) => (
            <>
              <TextInput
                mode="outlined"
                value={value}
                label="Documento*"
                error={!!error}
                style={styles.input}
                onChangeText={rest.onChange}
                {...rest}
              />
              <HelperText type="error" visible={!!error}>
                {error?.message}
              </HelperText>
            </>
          )}
        />
        <Controller
          control={control}
          name="vehicles"
          render={({ field: { value }, fieldState: { error } }) => {
            const vehicle = value?.[0];

            const valueText = vehicle
              ? `${vehicle?.brand} (${vehicle?.plate})`
              : "";

            return (
              <>
                <PaperSelect
                  label="Selecione um veículo"
                  arrayList={vehicles.map((vehicle) => ({
                    _id: vehicle.id,
                    value: `${vehicle.brand} (${vehicle.plate})`,
                  }))}
                  value={valueText}
                  onSelection={({ selectedList }) => {
                    const selectedVehicleId = selectedList[0]?._id;

                    const selectedVehicle = vehicles.find(
                      (vehicle) => vehicle.id === selectedVehicleId
                    );

                    if (selectedVehicle) {
                      setValue("vehicles", [selectedVehicle]);
                    } else {
                      resetField("vehicles", { defaultValue: [] });
                    }

                    setSelectedVehicles(selectedList);
                  }}
                  multiEnable={false}
                  selectedArrayList={selectedVehicles}
                  disabled={!vehicles.length}
                  dialogDoneButtonText="Selecionar"
                  dialogDoneButtonStyle={styles.dialogButton}
                  dialogCloseButtonText="Voltar"
                  dialogCloseButtonStyle={styles.dialogButton}
                  checkboxProps={{ checkboxColor: "#000" }}
                />
                <HelperText type="error" visible={!!error}>
                  {error?.message}
                </HelperText>
              </>
            );
          }}
        />
        <Button
          mode="contained"
          textColor="#000"
          onPress={handleSubmit(onSuccess, onError)}
          style={styles.button}
        >
          <Text>Enviar</Text>
        </Button>
      </View>
    </FormProvider>
  );
};

export const styles = StyleSheet.create({
  input: {
    marginBottom: 8,
  },
  button: {
    marginTop: 16,
  },
  dialogButton: {
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#f7df36",
    color: "#000",
  },
});
