import { Address } from "./address";

export interface Users {
  id?: string,
  nom: string,
  prenom: string,
  phone: number,
  email: string,
  motDePasse?: string,
  confirmPassword?: string,
  isActif?: boolean,
  address: Address,
  roles?: string[],
  pseudo?:string
}
