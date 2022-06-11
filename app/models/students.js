module.exports = (sequelize, Sequelize) => {
    const  students = sequelize.define("students", {
      firstName: {
        type: Sequelize.STRING, allowNull: false
      },
      lastName:{
        type:Sequelize.STRING
      },
      fullName:{
          type:Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING, allowNull: false
      },
      gender:{
        type: Sequelize.STRING
      },
      schoolID:{
        type: Sequelize.INTEGER
      }
    });
    return students;
  };