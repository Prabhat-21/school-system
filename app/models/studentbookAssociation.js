module.exports = (sequelize, Sequelize) => {
    const  studentbookAssociation = sequelize.define("studentbookAssociation", {
      studentID: {
        type: Sequelize.INTEGER, allowNull: false
      },
      bookID:{
        type:Sequelize.INTEGER, allowNull: false
      }
    });
    return studentbookAssociation;
  };