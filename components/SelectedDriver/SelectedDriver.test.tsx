import { screen } from "@testing-library/react-native";

import { renderWithProviders } from "@/utils/test-utils";

import { SelectedDriver } from "./";

describe("Component: SelectedDriver", () => {
  const name = "John Smith";
  const vehicle = { id: "1", brand: "Toyota", plate: "AAA-0000", driverId: "" };

  const mockup = {
    driver: {
      activeDriver: {
        id: "1",
        name,
        document: "000.000.000-00",
        vehicles: [vehicle],
      },
      drivers: [],
      hasError: false,
      isFetching: false,
    },
  };

  it("renders correctly", () => {
    const { toJSON } = renderWithProviders(<SelectedDriver />);

    expect(toJSON()).toMatchSnapshot();
  });

  it("renders correctly when driver's name is defined", () => {
    renderWithProviders(<SelectedDriver />, {
      preloadedState: mockup,
    });

    const element = screen.getByTestId("activeDriverName");

    expect(element).toBeTruthy();
    expect(element.props.children).toBe(name);
  });

  it("renders correctly when driver's name is undefined", () => {
    renderWithProviders(<SelectedDriver />);

    const element = screen.getByTestId("activeDriverName");

    expect(element).toBeTruthy();
    expect(element?.props.children).toBe(undefined);
  });

  it("renders correctly when driver's vehicle is defined", () => {
    renderWithProviders(<SelectedDriver />, {
      preloadedState: mockup,
    });

    const element = screen.getByTestId("activeDriverVehicle");

    expect(element).toBeTruthy();
    expect(element.props.children).toBe(
      `${vehicle?.brand} - ${vehicle?.plate}`
    );
  });

  it("renders correctly when driver's vehicle is undefined", () => {
    renderWithProviders(<SelectedDriver />);

    const element = screen.queryByTestId("activeDriverVehicle");

    expect(element).toBeFalsy();
  });
});
