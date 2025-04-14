import sequelize from "../db/index.js";
import { DataTypes } from "sequelize";

const User = sequelize.define(
  "user",
  {
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
    xp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    bonbons: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    coupons: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    attackBatches: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    defenseBatches: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    primaryPokemon: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    collectedCards: {
      allowNull: false,
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      defaultValue: [],
    },
    collectedBatches: {
      allowNull: false,
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
  },
  { paranoid: true }
);

//User.sync();

export default User;
