/**
 * Created by steven on 6/20/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//var User = require('../models/user.js');
//var express = require('express');
//var router = express.Router();

// define an db object
var userSchema = new Schema({
        content:[{
            checkTime: String,
            checkType: String,
            dataCenter: String,
            domainName: String,
            environment: String,
            hostname: String,
            statusInfo : [String]
        }

        ]


});

// bind module for accessing outside
module.exports = mongoose.model('users', userSchema);
/*
    checkTime: String,
    checkType: String,
    dataCenter: String,
    domainName: String,
    environment: String,
    hostname: String
    statusInfo: JSON*/
