import { randomUUID } from "crypto";
import { MD5 } from "crypto-js";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { Op } from "sequelize";
import AccessTokenModel from "../../database/models/AccessToken/AccessTokenModel";
import ApplicationModel from "../../database/models/Application/ApplicationModel";
import UserModel from "../../database/models/User/UserModel";
import { ApiResponse } from "../../types";

export const get = async (req: Request, res: Response) => {
  const result = await UserModel.findAll({
    include: [UserModel.associations.token],
  });

  const response: ApiResponse = {
    status: httpStatus.OK,
    errors: undefined,
    result: result,
  };

  res.status(httpStatus.OK).json(response);
};

export const post = async (req: Request, res: Response) => {
  try {
    const { api_key } = req.headers;

    const application = await ApplicationModel.findOne({
      where: { api_key: { [Op.eq]: api_key } },
    });
    if (!application) {
      res.sendStatus(httpStatus.BAD_REQUEST);
    }

    const token = await AccessTokenModel.create({
      token: randomUUID(),
      expires: new Date(),
      applicationId: application!.id,
    });

    const { name, email, password } = req.body;

    const user = await UserModel.create({
      name: name,
      email: email,
      password: MD5(password).toString(),
      uuid: randomUUID(),
      tokenId: token!.id,
    });

    const response: ApiResponse = {
      status: httpStatus.CREATED,
      result: user,
      errors: undefined,
    };

    res.status(httpStatus.CREATED).json(response);
  } catch (error) {
    const response: ApiResponse = {
      status: httpStatus.BAD_REQUEST,
      result: undefined,
      errors: error.errors?error.errors:error,
    };

    res.status(httpStatus.CREATED).json(response);
  }
};
