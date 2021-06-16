import {
  Model,
  Optional,
  DataTypes,
  Association,
  HasOneGetAssociationMixin,
} from "sequelize";

import sequelize from "../../database";
import ApplicationModel from "../Application/ApplicationModel";
import UserModel from "../User/UserModel";

interface AccessTokenAttr {
  id: number;
  token: string;
  expires: Date;
  applicationId: number;
}

interface AccessTokenCreationAttr extends Optional<AccessTokenAttr, "id"> {}

class AccessTokenModel
  extends Model<AccessTokenAttr, AccessTokenCreationAttr>
  implements AccessTokenAttr
{
  public id!: number;
  public token!: string;
  public expires!: Date;

  public applicationId!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;


  public getUser!: HasOneGetAssociationMixin<UserModel>;
  public readonly user?:UserModel


  public static associations: {
    user: Association<AccessTokenModel, UserModel>;
  };
}

AccessTokenModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expires: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    applicationId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "access_tokens",
  }
);

AccessTokenModel.hasOne(UserModel, {
  sourceKey: "id",
  foreignKey: "tokenId",
  as: "user",
});
UserModel.belongsTo(AccessTokenModel,{
  foreignKey:"tokenId",
  as:"token"
})

export default AccessTokenModel;
