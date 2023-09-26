import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "@/config";

interface AppointmentStatusModel
  extends Model<
    InferAttributes<AppointmentStatusModel>,
    InferCreationAttributes<AppointmentStatusModel>
  > {
  id: CreationOptional<number>;
  status: CreationOptional<boolean>;
  name: string;
}

export const AppointmentStatus = sequelize.define<AppointmentStatusModel>(
  "tbl_appointment_statuses",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  }
);
