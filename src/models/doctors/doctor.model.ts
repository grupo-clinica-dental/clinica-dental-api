import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "@/config";
import { DoctorSpecialty } from "@models/doctors/specialties/doctor-specialties";
import { DoctorSpecialtyUnion } from "@models/doctors/relations/doctor-specialties-relation";
import { User } from "@models/users/user.model";

interface DoctorModel
  extends Model<
    InferAttributes<DoctorModel>,
    InferCreationAttributes<DoctorModel>
  > {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  id: CreationOptional<number>;
  name: string;
  user_id?: number;
  status: CreationOptional<boolean>;
  color: string;
}

export const Doctor = sequelize.define<DoctorModel>(
  "tbl_doctors",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
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
    color: {
      type: DataTypes.STRING(8),
      allowNull: false,
    },
  },
  { timestamps: false }
);

Doctor.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

User.hasOne(Doctor, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
