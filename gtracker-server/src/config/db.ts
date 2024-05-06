import mongoose from "mongoose";

const envs = process.env;
const url = `mongodb://${envs.DB_USER}:${envs.DB_PASSWORD}@${envs.DB_HOST}:${envs.DB_PORT}/${envs.DB_NAME}?authSource=admin`;

const dbConnection = async () => await mongoose.connect(url);
export {
    dbConnection
};