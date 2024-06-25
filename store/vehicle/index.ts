import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { VehicleProps } from "@/services/jsonServer/vehicle/types";

import {
  getVehicles,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} from "../services";

import { VehicleStateProps } from "./types";

const initialState: VehicleStateProps = {
  activeVehicle: undefined,
  vehicles: [],
  isFetching: true,
  hasError: false,
};

export const VehicleSlice = createSlice({
  name: "vehicle",
  initialState,
  reducers: {
    setActiveVehicle: (
      state,
      action: PayloadAction<VehicleProps | undefined>
    ) => {
      state.activeVehicle = action.payload;
    },
    setVehicles: (state, action: PayloadAction<VehicleProps[]>) => {
      state.vehicles = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getVehicles.pending, (state) => {
      state.hasError = false;
      state.isFetching = true;
    });
    builder.addCase(getVehicles.rejected, (state) => {
      state.hasError = true;
      state.isFetching = false;
    });
    builder.addCase(
      getVehicles.fulfilled,
      (state, action: PayloadAction<VehicleProps[]>) => {
        state.vehicles = action.payload;
        state.isFetching = false;
      }
    );
    builder.addCase(
      createVehicle.fulfilled,
      (state, action: PayloadAction<VehicleProps | null>) => {
        const newVehicle = action.payload;

        if (newVehicle) {
          state.vehicles = [...state.vehicles, newVehicle];
        }
      }
    );
    builder.addCase(
      updateVehicle.fulfilled,
      (state, action: PayloadAction<VehicleProps | null>) => {
        const updatedVehicle = action.payload;

        if (updatedVehicle) {
          state.vehicles = state.vehicles.map((driver) => {
            const isUpdated = driver.id === updatedVehicle?.id;

            return isUpdated ? updatedVehicle : driver;
          });

          state.activeVehicle = updatedVehicle;
        }
      }
    );
    builder.addCase(
      deleteVehicle.fulfilled,
      (state, action: PayloadAction<VehicleProps | null>) => {
        const removedVehicle = action.payload;

        state.vehicles = state.vehicles.filter(
          (driver) => driver.id !== removedVehicle?.id
        );
      }
    );
  },
});

export const VehicleActions = VehicleSlice.actions;

export const vehicleReducer = VehicleSlice.reducer;
