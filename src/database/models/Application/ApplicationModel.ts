import {
    Model,
    DataTypes,
    HasManyGetAssociationsMixin,
    Optional,
    Association,
    HasManyCreateAssociationMixin
  } from "sequelize";

import sequelize from "../../database";

import AccessTokenModel from "../AccessToken/AccessTokenModel";

interface ApplicationAttr {
  id: number;
  name: string;
  api_key: string;
}

interface ApplicationCreationAttr extends Optional<ApplicationAttr, "id"> {}

class ApplicationModel
  extends Model<ApplicationAttr, ApplicationCreationAttr>
  implements ApplicationAttr
{
  public id!: number;
  public name!: string;
  public api_key!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getTokens!: HasManyGetAssociationsMixin<AccessTokenModel>;
  public createToken!: HasManyCreateAssociationMixin<AccessTokenModel>;

  public readonly tokens?: AccessTokenModel[];

  public static associations:{
    access_tokens:Association<ApplicationModel,AccessTokenModel>
  }

}

ApplicationModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    api_key: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
  },
  {
    sequelize,
    tableName: "applications",
  }
);

ApplicationModel.hasMany(AccessTokenModel, {
  sourceKey: "id",
  foreignKey: "applicationId",
as: "access_tokens",
});

export default ApplicationModel
