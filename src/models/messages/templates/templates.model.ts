import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "@/config";
import { MessageType } from "@models/messages/messages-types/messages-types.model";

interface MessageTemplateModel
  extends Model<
    InferAttributes<MessageTemplateModel>,
    InferCreationAttributes<MessageTemplateModel>
  > {
  id: CreationOptional<number>;
  message_type_id: number;
  content: string;
  status: boolean;
}

export const MessageTemplate = sequelize.define<MessageTemplateModel>(
  "tbl_message_templates",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    message_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "tbl_message_types", // Reference to the table name
        key: "id",
      },
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
  },
  { timestamps: false }
);

// Associations
MessageTemplate.belongsTo(MessageType, {
  foreignKey: "message_type_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

MessageType.hasMany(MessageTemplate, {
  foreignKey: "message_type_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
