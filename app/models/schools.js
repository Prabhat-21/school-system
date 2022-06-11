module.exports = (sequelize, Sequelize) => {
    const  schools = sequelize.define("schools", {
      regionID: {
        type: Sequelize.INTEGER, allowNull: false
      },
      school:{
        type:Sequelize.STRING, unique:true
      },
      email: {
        type: Sequelize.STRING, allowNull: false
      },
      principal:{
        type: Sequelize.STRING, allowNull: false
      },
      phone:{
        type: Sequelize.STRING, allowNull: false
      },
      address:{
        type: Sequelize.STRING, allowNull: false
      },
    });
    return schools;
  };