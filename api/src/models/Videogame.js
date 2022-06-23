const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (Sequelize) => {
  // defino el modelo
  Sequelize.define('Videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING, 
      unique: true,
      allowNull: false
    },
    description: {
      type : DataTypes.STRING,
      allowNull: false
    },
    released: {
      type : DataTypes.DATEONLY,
      defaultValue : DataTypes.NOW,
    },
    rating: {
      type : DataTypes.FLOAT
    },
    platforms: {
      type : DataTypes.STRING,
      allowNull: false
    },
    inBd : {
      type : DataTypes.BOOLEAN,
      allowNull : false,
      defaultValue : true
    }
  },{
    timestamps: false
  });
};
