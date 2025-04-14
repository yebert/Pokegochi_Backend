import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.PG_URI);
// const sequelize = new Sequelize(
//   "postgresql://pokegochi_db_owner:npg_J2NiExtzvK8f@ep-dark-hill-a2ucof1r-pooler.eu-central-1.aws.neon.tech/pokegochi_db?sslmode=require"
// );

export default sequelize;
