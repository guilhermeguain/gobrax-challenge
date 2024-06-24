import { VehicleProps } from "./types";

export const getVehicle = async (id: string) => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/vehicles/${id}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Unable to fetch vehicle");
    }

    const vehicle: VehicleProps = await response.json();

    return vehicle;
  } catch (error) {
    console.log(error, "getVehicleError");

    return null;
  }
};

export const getVehicles = async () => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/vehicles/`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Unable to fetch vehicles");
    }

    const vehicles: VehicleProps[] = await response.json();

    return vehicles;
  } catch (error) {
    console.log(error, "getVehiclesError");

    return [];
  }
};

export const createVehicle = async (vehicle: Exclude<VehicleProps, "id">) => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/vehicles`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(vehicle),
    });

    if (!response.ok) {
      throw new Error("Unable to create vehicle");
    }

    const result: VehicleProps = await response.json();

    return result;
  } catch (error) {
    console.log(error, "createVehicleError");

    return null;
  }
};

export const updateVehicle = async (vehicle: VehicleProps) => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/vehicles/${vehicle.id}`;

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(vehicle),
    });

    if (!response.ok) {
      throw new Error("Unable to update vehicle");
    }

    const result: VehicleProps = await response.json();

    return result;
  } catch (error) {
    console.log(error, "updateVehicleError");

    return null;
  }
};

export const deleteVehicle = async (id: string) => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/vehicles/${id}`;

  try {
    const response = await fetch(url, { method: "delete" });

    if (!response.ok) {
      throw new Error("Unable to delete vehicle");
    }

    const result: VehicleProps = await response.json();

    return result;
  } catch (error) {
    console.log(error, "deleteVehicleError");

    return false;
  }
};
