import { BaseEntity } from "../base-entity.interface";

interface Paciente extends BaseEntity {
  nombre: string;
  telefono: string;
  email: string;
  fecha_nacimiento?: Date;
}
