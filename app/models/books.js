module.exports = (sequelize, Sequelize) => {
    const  books = sequelize.define("books", {
      title: {
        type: Sequelize.STRING, allowNull: false, unique: true
      },
      authorName:{
        type:Sequelize.STRING,
      },
      dateOfPublication: {
        type: Sequelize.DATEONLY
      },
      noOfPages:{
        type: Sequelize.INTEGER, allowNull: false
      },
    });
    return books;
  };