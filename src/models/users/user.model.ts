import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "@/config";
import { Rol, RolModel } from "@/models/roles/roles.model";
import bcrypt from "bcrypt";

interface UserModel
  extends Model<
    InferAttributes<UserModel>,
    InferCreationAttributes<UserModel>
  > {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  id: CreationOptional<string>;
  name: string;
  email: string;
  phone: string;
  password: string;
  status: CreationOptional<boolean>;
  createdAt?: Date;
  updatedAt?: Date;
  role_id: number;
  role?: RolModel;
}

export const User = sequelize.define<UserModel>(
  "tbl_users",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(256),
      allowNull: false,
      set(value: string) {
        try {
          let password = value;

          bcrypt.hash(value, 10, (err, hash) => {
            if (err) {
              console.log(err);
            }

            password = hash;
          });

          this.setDataValue("password", password);
        } catch (error) {
          console.log(error);
        }
      },
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: async (user: any) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      beforeUpdate: async (user: any) => {
        if (user.changed("password")) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);

User.belongsTo(Rol, {
  foreignKey: "role_id",
  as: "role",
});
Rol.hasMany(User, {
  foreignKey: "role_id",
});
