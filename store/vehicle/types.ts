import { VehicleProps } from "@/services/jsonServer/vehicle/types";

export type VehicleStateProps = {
  vehicles: VehicleProps[];
  isFetching: boolean;
  hasError: boolean;
};
