'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Todo.belongsTo(models.User)
    }
  };
  Todo.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    due_date: {
      type: DataTypes.DATE,
      validate: {
        isAfterToday(value) {
          const today = new Date()
          if(new Date(value) < today) {
            throw new Error('Due date must at the future date')
          }
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
    }
  }, {
    hooks: {
      beforeCreate: (instance => {
        instance.status = false
      })
    },
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};