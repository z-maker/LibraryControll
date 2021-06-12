import {
  Model,
  DataTypes,
  HasManyGetAssociationsMixin,
  Optional,
  Association,
  HasManyCreateAssociationMixin,
} from "sequelize";

import sequelize from "../../database";

import AccessTokenModel from "../AccessToken/AccessTokenModel";

interface UserAttr {
  id: number;
  uuid: string;
  name: string;
  email: string;
  password: string;
  tokenId:number;
}

interface UserCreationAttr extends Optional<UserAttr, "id"> {}

class UserModel extends Model<UserAttr, UserCreationAttr> implements UserAttr {
  id!: number;
  uuid!: string;
  name!: string;
  email!: string;
  password!: string;
  tokenId!:number;
}

UserModel.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  uuid: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tokenId:{
      type:DataTypes.INTEGER.UNSIGNED,
      allowNull:false,
  }
},{
    sequelize,
    tableName:"users"
});

export default UserModel