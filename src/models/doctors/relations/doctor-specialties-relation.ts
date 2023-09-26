import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "@/config";
import { Doctor } from "../doctor.model";
import { DoctorSpecialty } from "../specialties/doctor-specialties";

interface DoctorSpecialtyUnion
  extends Model<
    InferAttributes<DoctorSpecialtyUnion>,
    InferCreationAttributes<DoctorSpecialtyUnion>
  > {
  doctor_id: number;
  specialty_id: number;
  status: CreationOptional<boolean>;
}

export const DoctorSpecialtyUnion = sequelize.define<DoctorSpecialtyUnion>(
  "tbl_doctor_specialties",
  {
    doctor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "tbl_doctors",
        key: "id",
      },
      primaryKey: true,
    },
    specialty_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "tbl_specialties",
        key: "id",
      },
      primaryKey: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  }
);

Doctor.belongsToMany(DoctorSpecialty, {
  through: DoctorSpecialtyUnion,
  foreignKey: "doctor_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

DoctorSpecialty.belongsToMany(Doctor, {
  through: DoctorSpecialtyUnion,
  foreignKey: "specialty_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
