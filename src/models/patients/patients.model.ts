import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "@/config";

interface PatientModel
  extends Model<
    InferAttributes<PatientModel>,
    InferCreationAttributes<PatientModel>
  > {
  id: CreationOptional<number>;
  name: string;
  phone: string;
  email: string;
  birth_date?: Date;
  status: CreationOptional<boolean>;
}

export const Patient = sequelize.define<PatientModel>("tbl_patients", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  birth_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});
