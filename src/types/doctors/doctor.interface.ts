import { BaseEntity } from "../base-entity.interface";

export interface Doctor extends BaseEntity {
  usuario_id: number;
  color: string;
}

export interface Especialidad extends BaseEntity {
  nombre: string;
}

export interface DoctorEspecialidad {
  doctor_id: number;
  especialidad_id: number;
  estado: boolean;
  fecha_borrado?: Date;
}
