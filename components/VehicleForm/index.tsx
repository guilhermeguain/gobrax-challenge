import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Text, Button, TextInput, HelperText } from "react-native-paper";

import { useAppDispatch } from "@/store";
import { getVehicles } from "@/store/services";

import { vehicleFormSchema } from "./schemas";
import { VehicleFormSchemaProps, VehicleFormProps } from "./types";

export const VehicleForm = ({
  title,
  defaultValues,
  onSuccess,
  onError,
}: VehicleFormProps) => {
  const dispatch = useAppDispatch();

  const methods = useForm<VehicleFormSchemaProps>({
    resolver: zodResolver(vehicleFormSchema),
    defaultValues: {
      id: "",
      ...defaultValues,
    },
  });

  const { control, handleSubmit } = methods;

  useEffect(() => {
    dispatch(getVehicles());
  }, [getVehicles]);

  return (
    <FormProvider {...methods}>
      <View>
        <Text variant="headlineMedium">{title}</Text>
        <Controller
          control={control}
          name="brand"
          render={({
            field: { value = "", ...rest },
            fieldState: { error },
          }) => (
            <TextInput
              mode="outlined"
              value={value}
              label="Marca*"
              error={!!error}
              style={styles.input}
              onChangeText={rest.onChange}
              {...rest}
            />
          )}
        />
        <Controller
          control={control}
          name="plate"
          render={({
            field: { value = "", ...rest },
            fieldState: { error },
          }) => (
            <>
              <TextInput
                mode="outlined"
                value={value}
                label="Placa*"
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
