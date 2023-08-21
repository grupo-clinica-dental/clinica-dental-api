import { BaseEntity } from "../base-entity.interface";

export interface MessageType extends BaseEntity {
  tipo: string;
  mensaje_template: string;
}

export interface Message extends BaseEntity {
  tipo_mensaje_id: number;
  usuario_id: number;
  cita_id: number;
  contenido: string;
  fecha_envio: Date;
}
