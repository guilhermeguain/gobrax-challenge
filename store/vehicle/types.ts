import { VehicleProps } from "@/services/jsonServer/vehicle/types";

export type VehicleStateProps = {
  activeVehicle?: VehicleProps;
  vehicles: VehicleProps[];
  isFetching: boolean;
  hasError: boolean;
};
