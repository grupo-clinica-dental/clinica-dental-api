import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "@/config";
import { Appointment } from "@models/appointments/appointment.model";
import { MessageStatus } from "@models/messages/status/messages-status.model";
import { MessageType } from "@models/messages/messages-types/messages-types.model";
import { Patient } from "../patients/patients.model";
import { User } from "@models/users/user.model";

interface MessageModel
  extends Model<
    InferAttributes<MessageModel>,
    InferCreationAttributes<MessageModel>
  > {
  id: CreationOptional<number>;
  appointment_id?: number;
  patient_id?: number;
  user_id?: number;
  message_type_id?: number;
  sent_status_id?: number;
  content: string;
  status: CreationOptional<boolean>;
}

export const Message = sequelize.define<MessageModel>(
  "tbl_messages",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    appointment_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    message_type_id: {
      type: DataTypes.INTEGER,
      allowNull: true, // or false, based on your requirement
      references: {
        model: "tbl_message_types",
        key: "id",
      },
    },
    sent_status_id: {
      type: DataTypes.INTEGER,
      allowNull: true, // or false, based on your requirement
      references: {
        model: "tbl_message_statuses",
        key: "id",
      },
    },
  },
  {
    indexes: [
      {
        fields: ["user_id"],
      },
      {
        fields: ["appointment_id"],
      },
      {
        fields: ["message_type_id"],
      },
    ],
  }
);

Message.belongsTo(MessageStatus, {
  foreignKey: "sent_status_id",
  as: "sent_status",
});

MessageStatus.hasMany(Message, {
  foreignKey: "sent_status_id",
  as: "messages",
});

Message.belongsTo(MessageType, {
  foreignKey: "message_type_id",
  as: "message_type",
});

MessageType.hasMany(Message, {
  foreignKey: "message_type_id",
  as: "messages",
});

Message.belongsTo(Patient, {
  foreignKey: "patient_id",
  as: "patient",
});

Patient.hasMany(Message, {
  foreignKey: "patient_id",
  as: "messages",
});

Message.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

User.hasMany(Message, {
  foreignKey: "user_id",
  as: "messages",
});

// Message.belongsTo(Appointment, {
//   foreignKey: {
//     name: "appointment_id",
//     allowNull: true,
//   },
//   as: "appointment",
// });

// Appointment.hasMany(Message, {
//   foreignKey: {
//     name: "appointment_id",
//     allowNull: true,
//   },
//   as: "messages",
// });
