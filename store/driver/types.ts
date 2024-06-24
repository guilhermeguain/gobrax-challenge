import { DriverProps } from "@/services/jsonServer/driver/types";

export type DriverStateProps = {
  activeDriver?: DriverProps;
  drivers: DriverProps[];
  isFetching: boolean;
  hasError: boolean;
};
