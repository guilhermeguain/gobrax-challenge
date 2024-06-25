import { DriverProps } from "./types";

export const getDriver = async (id: string) => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/drivers/${id}?_embed=vehicles`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Unable to fetch driver");
    }

    const driver: DriverProps = await response.json();

    return driver;
  } catch (error) {
    console.log(error, "getDriverError");

    return null;
  }
};

export const getDrivers = async () => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/drivers?_embed=vehicles`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Unable to fetch drivers");
    }

    const drivers: DriverProps[] = await response.json();

    return drivers;
  } catch (error) {
    console.log(error, "getDriversError");

    return [];
  }
};

export const createDriver = async (
  driver: Omit<DriverProps, "id" | "vehicles">
) => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/drivers`;

  const payload = {
    name: driver.name,
    document: driver.document,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Unable to create driver");
    }

    const result: DriverProps = await response.json();

    return result;
  } catch (error) {
    console.log(error, "createDriverError");

    return null;
  }
};

export const updateDriver = async (driver: Omit<DriverProps, "vehicles">) => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/drivers/${driver.id}`;

  const payload = {
    id: driver.id,
    name: driver.name,
    document: driver.document,
  };

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Unable to update driver");
    }

    const result: DriverProps = await response.json();

    return result;
  } catch (error) {
    console.log(error, "updateDriverError");

    return null;
  }
};

export const deleteDriver = async (id: string) => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/drivers/${id}`;

  try {
    const response = await fetch(url, { method: "delete" });

    if (!response.ok) {
      throw new Error("Unable to delete driver");
    }

    const result: DriverProps = await response.json();

    return result;
  } catch (error) {
    console.log(error, "deleteDriverError");

    return null;
  }
};
