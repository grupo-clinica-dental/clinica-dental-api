import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "@/config";

interface MessageStatusModel
  extends Model<
    InferAttributes<MessageStatusModel>,
    InferCreationAttributes<MessageStatusModel>
  > {
  id: CreationOptional<number>;
  name: string;
  status: CreationOptional<boolean>;
}

export const MessageStatus = sequelize.define<MessageStatusModel>(
  "tbl_message_statuses",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  }
);
