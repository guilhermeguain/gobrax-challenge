import { jsonServer } from "@/services/jsonServer";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getDrivers = createAsyncThunk("driver/getDrivers", async () => {
  const response = await jsonServer.getDrivers();

  return response;
});

export const getVehicles = createAsyncThunk("vehicle/getVehicles", async () => {
  const response = await jsonServer.getVehicles();

  return response;
});
