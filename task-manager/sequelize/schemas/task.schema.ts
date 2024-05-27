import { DataTypes } from 'sequelize'
import sequelize from '..'

const Task = sequelize.define('task', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [3, 20],
        msg: 'Name can only be between 3 to 20 characters',
      },
    },
  },

  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
})

export default Task
