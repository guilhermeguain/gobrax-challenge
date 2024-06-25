import { DriverProps } from "@/services/jsonServer/driver/types";

export const mockGetDriversResponse: DriverProps[] = [
  {
    id: "ab12",
    name: "John Doe",
    document: "000.000.000-00",
    vehicles: [],
  },
  {
    id: "cd34",
    name: "Paul Jones",
    document: "111.111.111-11",
    vehicles: [],
  },
];
