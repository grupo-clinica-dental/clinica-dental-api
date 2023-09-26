import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "@/config";
import { Doctor } from "@models/doctors/doctor.model";
import { DoctorSpecialtyUnion } from "@models/doctors/relations/doctor-specialties-relation";

interface DoctorSpecialtyModel
  extends Model<
    InferAttributes<DoctorSpecialtyModel>,
    InferCreationAttributes<DoctorSpecialtyModel>
  > {
  id: CreationOptional<number>;
  name: string;
  status: CreationOptional<boolean>;
  deletion_date?: Date;
}

export const DoctorSpecialty = sequelize.define<DoctorSpecialtyModel>(
  "tbl_specialties",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  }
);
