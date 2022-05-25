import { Address } from "./address";

export interface Users {
  id?: string,
  lastname: string,
  firstname: string,
  phone: number,
  email: string,
  password: string,
  confirmPassword?: string,
  isActif?: boolean,
  address: Address
}
