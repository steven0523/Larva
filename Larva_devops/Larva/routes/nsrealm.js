var express = require('express');

var router = express.Router();

router.post('/',function (req,res) {
		if(!req.body){
			var body = '', jsonStr;
			req.on('data', function (chunk) {
				body += chunk; //读取参数流转化为字符串
			});
			req.on('end', function () {
				//读取参数流结束后将转化的body字符串解析成 JSON 格式
				try {
					//console.log("typeof airport:"+ typeof body);
					var cell = eval('('+body+')');

					var ns = require('../models/nsdomains.js');
					var servers = ns.getServers(cell);
					for (var i = 0; i < servers.length; i++) {
						var server = servers[i];
						console.log(server.name + server.domain);
					}
					res.json(servers);
				} catch (err) {
					console.log(err);
				}
			});	
		}
});

router.get('/:domain/:OTAP/:DC',function (req,res) {
	var cell = {domain:req.params.domain,OTAP:req.params.OTAP,DC:req.params.DC}
	if(req.params.domain === '*'){
		delete cell.domain;
	}
	if(req.params.OTAP === '*'){
		delete cell.OTAP;
	}
	if(req.params.DC === '*'){
		delete cell.DC;
	}
	
	
	var ns = require('../models/nsdomains.js');	
	var servers = ns.getServers(cell);
	for (var i = 0; i < servers.length; i++) {
		var server = servers[i];
	}
	res.json(servers);
});



module.exports = router;


