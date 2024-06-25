import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { DriverProps } from "@/services/jsonServer/driver/types";

import {
  getDrivers,
  createDriver,
  updateDriver,
  deleteDriver,
} from "../services";

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
      state.hasError = false;
      state.isFetching = true;
    });
    builder.addCase(getDrivers.rejected, (state) => {
      state.hasError = true;
      state.isFetching = false;
    });
    builder.addCase(
      getDrivers.fulfilled,
      (state, action: PayloadAction<DriverProps[]>) => {
        state.drivers = action.payload;
        state.isFetching = false;
      }
    );
    builder.addCase(
      createDriver.fulfilled,
      (state, action: PayloadAction<DriverProps | null>) => {
        const newDriver = action.payload;

        if (newDriver) {
          state.drivers = [...state.drivers, newDriver];
        }
      }
    );
    builder.addCase(
      updateDriver.fulfilled,
      (state, action: PayloadAction<DriverProps | null>) => {
        const updatedDriver = action.payload;

        if (updatedDriver) {
          state.drivers = state.drivers.map((driver) => {
            const isUpdated = driver.id === updatedDriver?.id;

            return isUpdated ? updatedDriver : driver;
          });

          state.activeDriver = updatedDriver;
        }
      }
    );
    builder.addCase(
      deleteDriver.fulfilled,
      (state, action: PayloadAction<DriverProps | null>) => {
        const removedDriver = action.payload;

        state.drivers = state.drivers.filter(
          (driver) => driver.id !== removedDriver?.id
        );
      }
    );
  },
});

export const DriverActions = DriverSlice.actions;

export const driverReducer = DriverSlice.reducer;
