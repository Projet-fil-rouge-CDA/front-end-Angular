export interface Register {
  id?: string,
  lastname: string,
  firstname: string,
  phone: number,
  email: string,
  password: string,
  confirmPassword?: string,
  isActif?: boolean
}
