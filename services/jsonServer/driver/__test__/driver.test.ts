import { jsonServer } from "../../";

import { mockGetDriverResponse } from "./mocks/getDriver";
import { mockGetDriversResponse } from "./mocks/getDrivers";
import { mockCreateDriverResponse } from "./mocks/createDriver";
import { mockUpdateDriverResponse } from "./mocks/updateDriver";

describe("Service: driver", () => {
  const properties = ["id", "name", "document", "vehicles"];

  it("should return all driver properties in the getDriver method", async () => {
    jest
      .spyOn(jsonServer, "getDriver")
      .mockResolvedValue(mockGetDriverResponse);

    const response = await jsonServer.getDriver(mockGetDriverResponse.id);

    properties.forEach((property) => {
      expect(response).toHaveProperty(property);
    });
  });

  it("should return a list of drivers in the getDrivers method", async () => {
    jest
      .spyOn(jsonServer, "getDrivers")
      .mockResolvedValue(mockGetDriversResponse);

    const response = await jsonServer.getDrivers();

    expect(response).toHaveLength(mockGetDriversResponse.length);
  });

  it("should return an id for the driver created in the createDriver method", async () => {
    jest
      .spyOn(jsonServer, "createDriver")
      .mockResolvedValue(mockCreateDriverResponse);

    const response = await jsonServer.createDriver({
      name: mockCreateDriverResponse.name,
      document: mockCreateDriverResponse.document,
    });

    expect(response).toHaveProperty("id");
  });

  it("should update driver's name in the updateDriver method", async () => {
    jest
      .spyOn(jsonServer, "updateDriver")
      .mockResolvedValue(mockUpdateDriverResponse);

    const response = await jsonServer.updateDriver({
      ...mockUpdateDriverResponse,
    });

    expect(response?.name).toBe(mockUpdateDriverResponse.name);
  });
});
