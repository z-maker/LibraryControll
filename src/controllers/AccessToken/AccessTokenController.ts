import { Request, Response } from "express"
import httpStatus from "http-status";
import AccessTokenModel from "../../database/models/AccessToken/AccessTokenModel";
import { ApiResponse } from "../../types";

export const get = async (req: Request, res: Response) => {
    AccessTokenModel.findAll(
        {
            include:[AccessTokenModel.associations.user]
        }
    ).then( results => {

        const response:ApiResponse = {
            status:httpStatus.OK,
            result:results,
            errors:undefined
        }

        res.status(response.status).json(response)

    }).catch( errors => {
        const response:ApiResponse = {
            status:httpStatus.NOT_FOUND,
            result:undefined,
            errors:errors
        }
        res.status(response.status).json(response)
    })
};