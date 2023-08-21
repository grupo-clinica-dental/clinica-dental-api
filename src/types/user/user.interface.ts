import { BaseEntity } from "../base-entity.interface";

export interface User extends BaseEntity {
  id: number;
  nombre: string;
  email: string;
  telefono?: string;
  estado: boolean;
  rol: string;
  iat?: number;
  exp?: number;
}
