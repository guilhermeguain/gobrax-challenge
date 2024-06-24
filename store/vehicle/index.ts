import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { VehicleProps } from "@/services/jsonServer/vehicle/types";

import { getVehicles } from "../services";

import { VehicleStateProps } from "./types";

const initialState: VehicleStateProps = {
  vehicles: [],
  isFetching: true,
  hasError: false,
};

export const DriverSlice = createSlice({
  name: "driver",
  initialState,
  reducers: {
    setVehicles: (state, action: PayloadAction<VehicleProps[]>) => {
      state.vehicles = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getVehicles.pending, (state) => {
      console.log("getVehicles.pending");
      state.hasError = false;
      state.isFetching = true;
    });
    builder.addCase(getVehicles.rejected, (state) => {
      console.log("getVehicles.rejected");
      state.hasError = true;
      state.isFetching = false;
    });
    builder.addCase(
      getVehicles.fulfilled,
      (state, action: PayloadAction<VehicleProps[]>) => {
        console.log("getVehicles.fulfilled");
        state.vehicles = action.payload;
        state.isFetching = false;
      }
    );
  },
});

export const DriverActions = DriverSlice.actions;

export const driverReducer = DriverSlice.reducer;
