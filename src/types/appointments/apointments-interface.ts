import { BaseEntity } from "../base-entity.interface";

export interface Appointment extends BaseEntity {
  fecha_creacion: Date;
  doctor_id: number;
  paciente_id: number;
  estado_id: number;
  google_calendar_event_id?: string;
  ubicacion?: string;
  descripcion?: string;
  notas?: string;
  fecha_inicio: Date;
  fecha_final: Date;
}

export interface AppointmentStatus extends BaseEntity {
  nombre: string;
}
