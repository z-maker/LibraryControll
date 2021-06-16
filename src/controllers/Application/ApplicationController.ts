import { Request, Response } from "express";

import { Op } from "sequelize";

import { ApiResponse } from "../../types";

import HttpStatus from "http-status";
import ApplicationModel from "../../database/models/Application/ApplicationModel";
import { randomUUID } from "crypto";

import AccessTokenModel from "../../database/models/AccessToken/AccessTokenModel";
import UserModel from "../../database/models/User/UserModel";

export const get = async (req: Request, res: Response) => {
  ApplicationModel.findAll({include:[ApplicationModel.associations.access_tokens]})
    .then((results) => {
      const response: ApiResponse = {
        status: HttpStatus.OK,
        result: results,
        errors: undefined,
      };

      res.status(response.status).json(response);
    })
    .catch((errors) => {
      const response: ApiResponse = {
        status: HttpStatus.OK,
        result: undefined,
        errors: errors,
      };

      res.status(response.status).json(response);
    });
};

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;

  ApplicationModel.findOne({ where: { id: { [Op.eq]: id } },include:[ApplicationModel.associations.access_tokens] })
    .then((results) => {

      const response: ApiResponse = {
        status: HttpStatus.OK,
        result: results,
        errors: undefined,
      };

      res.status(response.status).json(response);
    })
    .catch((errors) => {
      const response: ApiResponse = {
        status: HttpStatus.NOT_FOUND,
        result: undefined,
        errors: errors,
      };

      res.status(response.status).json(response);
    });
};

export const post = async (req: Request, res: Response) => {
  const { name } = req.body;

  const application = ApplicationModel.build({
    name: name,
    api_key: randomUUID(),
  });

  application
    .save()
    .then((results) => {
      const result: ApiResponse = {
        status: HttpStatus.CREATED,
        result: results,
        errors: undefined,
      };
      res.status(result.status).json(result);
    })
    .catch((errors) => {
      const result: ApiResponse = {
        status: HttpStatus.CREATED,
        result: undefined,
        errors: errors,
      };
      res.status(result.status).json(result);
    });
};

export const put = async (req: Request, res: Response) => {
  const { id, name } = req.body;

  ApplicationModel.update(
    {
      name: name,
    },
    { where: { id: { [Op.eq]: id } } }
  )
    .then((results) => {
      const result: ApiResponse = {
        status: HttpStatus.CREATED,
        result: results,
        errors: undefined,
      };
      res.status(result.status).json(result);
    })
    .catch((errors) => {
      const result: ApiResponse = {
        status: HttpStatus.CREATED,
        result: undefined,
        errors: errors,
      };
      res.status(result.status).json(result);
    });
};

export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;

  ApplicationModel.destroy({ where: { id: { [Op.eq]: id } } })
    .then((results) => {
      const result: ApiResponse = {
        status: HttpStatus.NO_CONTENT,
        result: results,
        errors: undefined,
      };
      res.status(result.status).json(result);
    })
    .catch((errors) => {
      const result: ApiResponse = {
        status: HttpStatus.BAD_REQUEST,
        result: undefined,
        errors: errors,
      };
      res.status(result.status).json(result);
    });
};
