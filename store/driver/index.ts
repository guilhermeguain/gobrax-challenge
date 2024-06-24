import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { DriverProps } from "@/services/jsonServer/driver/types";

import { getDrivers } from "../services";

import { DriverStateProps } from "./types";

const initialState: DriverStateProps = {
  activeDriver: undefined,
  drivers: [],
  isFetching: true,
  hasError: false,
};

export const DriverSlice = createSlice({
  name: "driver",
  initialState,
  reducers: {
    setActiveDriver: (
      state,
      action: PayloadAction<DriverProps | undefined>
    ) => {
      state.activeDriver = action.payload;
    },
    setDrivers: (state, action: PayloadAction<DriverProps[]>) => {
      state.drivers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDrivers.pending, (state) => {
      console.log("getDrivers.pending");
      state.hasError = false;
      state.isFetching = true;
    });
    builder.addCase(getDrivers.rejected, (state) => {
      console.log("getDrivers.rejected");
      state.hasError = true;
      state.isFetching = false;
    });
    builder.addCase(
      getDrivers.fulfilled,
      (state, action: PayloadAction<DriverProps[]>) => {
        console.log("getDrivers.fulfilled");
        state.drivers = action.payload;
        state.isFetching = false;
      }
    );
  },
});

export const DriverActions = DriverSlice.actions;

export const driverReducer = DriverSlice.reducer;
