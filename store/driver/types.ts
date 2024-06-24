import { DriverProps } from "@/services/jsonServer/types/driver";

export type DriverStateProps = {
  activeDriver?: DriverProps;
  drivers: DriverProps[];
  isFetching: boolean;
  hasError: boolean;
};
