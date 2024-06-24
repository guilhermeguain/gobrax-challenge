import { DriverProps } from "./types";

export const getDriver = async (id: string) => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/drivers/${id}`;

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
  const url = `${process.env.EXPO_PUBLIC_API_URL}/drivers/`;

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

export const createDriver = async (driver: Exclude<DriverProps, "id">) => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/drivers`;

  try {
    const response = await fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(driver),
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

export const updateDriver = async (driver: DriverProps) => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/drivers/${driver.id}`;

  try {
    const response = await fetch(url, {
      method: "patch",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(driver),
    });

    if (!response.ok) {
      throw new Error("Unable to fetch driver");
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

    return true;
  } catch (error) {
    console.log(error, "deleteDriverError");

    return false;
  }
};
