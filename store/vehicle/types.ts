import { VehicleProps } from "@/services/jsonServer/types/vehicle";

export type VehicleStateProps = {
  vehicles: VehicleProps[];
  isFetching: boolean;
  hasError: boolean;
};
