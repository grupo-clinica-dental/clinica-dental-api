import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "@/config";
import { Message } from "@models/messages/messages.model";
import { Doctor } from "@models/doctors/doctor.model";
import { Patient } from "../patients/patients.model";

interface AppointmentModel
  extends Model<
    InferAttributes<AppointmentModel>,
    InferCreationAttributes<AppointmentModel>
  > {
  id: CreationOptional<number>;
  doctor_id?: number;
  patient_id?: number;
  appointment_status_id?: number;
  google_calendar_event_id?: string;
  description?: string;
  status: CreationOptional<boolean>;
  start_date: Date;
  end_date: Date;
}

export const Appointment = sequelize.define<AppointmentModel>(
  "tbl_appointments",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    google_calendar_event_id: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }
);

Appointment.hasMany(Message, {
  foreignKey: "appointment_Id", // This will add appointmentId to the Message model
  as: "messages", // This allows us to get all messages for a particular appointment using this alias
});
Message.belongsTo(Appointment, {
  foreignKey: {
    name: "appointment_Id",
    allowNull: false,
  },
  as: "appointment",
});

Appointment.belongsTo(Doctor, {
  foreignKey: "doctorId", // This will add doctorId to the Appointment model
  as: "doctor", // This allows us to get the doctor for a particular appointment using this alias
});
Doctor.hasMany(Appointment, {
  foreignKey: "doctorId",
  as: "appointments", // This allows us to get all appointments for a particular doctor using this alias
});

Appointment.belongsTo(Patient, {
  foreignKey: "patientId",
  as: "patient",
});

Patient.hasMany(Appointment, {
  foreignKey: "patientId",
  as: "appointments",
});
