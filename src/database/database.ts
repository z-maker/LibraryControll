import { Sequelize } from "sequelize";

import { db_config } from "../config";

const sequelize = new Sequelize(
  db_config.database,
  db_config.user,
  db_config.password,
  {
    logging: false,
    host: db_config.host,
    port: db_config.port,
    dialect: "mysql",
  }
);

export default sequelize;