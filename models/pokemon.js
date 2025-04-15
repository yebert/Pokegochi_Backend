import sequelize from "../db/index.js";
import { DataTypes } from "sequelize";

const Pokemon = sequelize.define(
  "pokemon",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    orderNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    attack: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    attackValue: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    health: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    currentHealth: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    defenseValue: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    xp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    predecessor: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    successor: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    hunger: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 100,
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    isSelected: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    refStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    imgFront: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imgBack: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imgCard: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { paranoid: true }
);

Pokemon.sync();

export default Pokemon;
