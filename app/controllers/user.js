const User = require('../models/user'),
  jwt = require('../../config/jwt'),
  config = require('../../config/config');

class UserController {
  static signup(req, res) {
    if(req.body.name && req.body.password) {
      const user = new User(req.body);
      user.save((error, newUser) => {
        if(error) {
          return res.status(500).send({
            status: 'Error',
            message: error.errors,
          })
        }
        return res.status(201).send({
          status: 'Success',
          message: 'User created',
          data: {
            user,
          },
        })
      })
    } else {
        return res.status(400).send({
          status: 'Fail',
          message: 'Incomplete signup details',
        })
      }
  }

  static signin(req, res) {
    if(req.body.name && req.body.password) {
      User.findOne({
        name: req.body.name,
      }, (error, user) => {
        if(error) throw err;
        if(!user) {
          return res.status(401).send({
            status: 'Fail',
            message: 'Username or password incorrect',
          })
        } else {
          if (user.password !== req.body.password) {
            return res.status(401).send({
              status: 'Fail',
              message: 'Username or password incorrect',
            })
          } else {
            const token = jwt.generateToken(user)
            
            return res.status(200).send({
              status: 'Success',
              message: 'User logged in',
              data: {
                token,
              }
            })
          }
        }
      })
    } else {
      return res.status(400).send({
        status: 'Fail',
        message: 'Incomplete signin details',
      })
    }  
  }

  static getUsers(req, res) {
    User.find({}, (error, users) =>{
      return res.status(200).send({
        status: 'Success',
        message: 'Users retrieved',
        data: {
          users,
        }
      })
    })
  }
}

module.exports = UserController;
