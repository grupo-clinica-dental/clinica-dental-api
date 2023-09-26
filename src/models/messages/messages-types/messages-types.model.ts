import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "@/config";

interface MessageTypeModel
  extends Model<
    InferAttributes<MessageTypeModel>,
    InferCreationAttributes<MessageTypeModel>
  > {
  id: CreationOptional<number>;
  type: string;
  status: CreationOptional<boolean>;
}

export const MessageType = sequelize.define<MessageTypeModel>(
  "tbl_message_types",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    type: {
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
