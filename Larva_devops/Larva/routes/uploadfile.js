var express = require('express');
var router = express.Router();
var fs = require('fs');

var multer  =   require('multer');
var moment = require('moment');
var Log = require('../models/log.js');

var UPLOAD_BASE = './public/uploads/';

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
	var day =  moment().format('YYYYMMDD');
	var basePath = UPLOAD_BASE+ day ;
	var path = basePath + '/' + req.params.issueid;

	if(!fs.existsSync(basePath)){
		fs.mkdirSync(basePath);
	}
	if(!fs.existsSync(path)){
			fs.mkdirSync(path);
	}
	var destPath = '/uploads/' + day + '/'+req.params.issueid;
	req.params.path = destPath; 

    callback(null, path);
  },
  filename: function (req, file, callback) {
	var time =   moment().format('HHmmssSSSS');
	var logFileName = time +'.'+file.originalname;
	req.params.filename = logFileName; 
    callback(null,  logFileName );
  }
});
var a = { storage : storage};

var upload = multer(a).single('logfile');


router.post('/:logid',function(req,res){
	Log.getLog(req.params.logid, function(log){
		req.params.issueid = log.issueid;

		console.log(log);
		upload(req,res,function(err) {
			if(err) {
				return res.json(err);
			}
			log.path = req.params.path+ '/' +req.params.filename;
			log.uploaded= true;

			Log.save(log,function(err){
				res.json(err);
			});
		});
		
	});
	
});


module.exports = router;
