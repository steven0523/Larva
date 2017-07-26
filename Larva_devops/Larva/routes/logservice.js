var express = require('express');
var router = express.Router();
var Log = require('../models/log.js');


router.get('/:issueid', function (req, res) {
	Log.getLogs({issueid:req.params.issueid},function(logs){
		//console.log(logs);
		res.json(logs);
	});
});

router.get('/:server/:domain', function (req, res) {
	console.log(req.params.server);
	console.log(req.params.domain);
	var q = {name:req.params.server,domain:req.params.domain, uploaded:false};
	
	if(q.domain === '*'){
		delete q.domain;
	}
	if(q.name === '*'){
		delete q.name;
	}
	
	Log.getLogs(q,function(logs){
		res.json(logs);
	});
});


router.post('/', function (req, res) {
	var log;
	//console.log("posted:"+req.body)
	var body = '', jsonStr;
	if(!req.body){
		req.on('data', function (chunk) {
			body += chunk; //读取参数流转化为字符串
		});

		req.on('end', function () {
			try {

				var log = eval('('+body+')');
				Log.save(log,function(result){
					res.json(result);
				});
			} catch (err) {
				console.log(err);
			}
		});
	}else{
		log = req.body;
		Log.save(log,function(result){
					res.json(result);
				});
	}
});

module.exports = router;