import { VehicleProps } from "../vehicle/types";

export type DriverProps = {
  id: string;
  name: string;
  document: string;
  vehicles: VehicleProps[];
};
