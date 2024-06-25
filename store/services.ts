import { createAsyncThunk } from "@reduxjs/toolkit";

import { jsonServer } from "@/services/jsonServer";
import { DriverProps } from "@/services/jsonServer/driver/types";
import { VehicleProps } from "@/services/jsonServer/vehicle/types";

export const getDrivers = createAsyncThunk("driver/getDrivers", async () => {
  const response = await jsonServer.getDrivers();

  return response;
});

export const createDriver = createAsyncThunk(
  "driver/createDriver",
  async (driver: Exclude<DriverProps, ["id"]>) => {
    const response = await jsonServer.createDriver(driver);

    return response;
  }
);

export const updateDriver = createAsyncThunk(
  "driver/updateDriver",
  async (driver: DriverProps) => {
    const response = await jsonServer.updateDriver(driver);

    return response;
  }
);

export const deleteDriver = createAsyncThunk(
  "driver/deleteDriver",
  async (id: string) => {
    const response = await jsonServer.deleteDriver(id);

    return response;
  }
);

export const getVehicles = createAsyncThunk("vehicle/getVehicles", async () => {
  const response = await jsonServer.getVehicles();

  return response;
});

export const createVehicle = createAsyncThunk(
  "driver/createVehicle",
  async (vehicle: Exclude<VehicleProps, "id">) => {
    const response = await jsonServer.createVehicle(vehicle);

    return response;
  }
);

export const updateVehicle = createAsyncThunk(
  "driver/updateVehicle",
  async (driver: VehicleProps) => {
    const response = await jsonServer.updateVehicle(driver);

    return response;
  }
);

export const deleteVehicle = createAsyncThunk(
  "driver/deleteVehicle",
  async (id: string) => {
    const response = await jsonServer.deleteVehicle(id);

    return response;
  }
);
