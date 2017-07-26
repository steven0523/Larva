var express = require('express');
var router = express.Router();
var Issue = require('../models/issue.js');
var util = require('util');


/*router.post('/', function (req, res) {
	console.log("incoming issue:" + req.body);
	var body = '', jsonStr;
	req.on('data', function (chunk) {
		console.log("data:" + chunk);
		body += chunk; //读取参数流转化为字符串
	});
	
	req.on('end', function () {
		try {
			console.log("body data:" + body);

			var issue = eval('('+body+')');
			Issue.save(issue,function(result){
				res.json(result);
			});
		} catch (err) {
			console.log(err);
		}
	});
	
})*/;

router.post('/', function (req, res) {
    var body = '', jsonStr;
    var issue;
    if(!req.body){
        req.on('data', function (chunk) {
            body += chunk; //读取参数流转化为字符串
        });

        req.on('end', function () {
            try {
                issue = eval('('+body+')');
                Issue.save(issue,function(result){
                    res.json(result);
                });
            } catch (err) {
                console.log(err);
            }
        });
    }else{
        issue = req.body;
        Issue.save(issue,function(result){
            res.json(result);
        });
    }
});

router.get('/:issueid', function (req, res) {
	Issue.getIssue({issueid:req.params.issueid},function(issue){
		console.log(issue);
		res.json(issue);
	});
});

router.put('/:issueid/:isIssue', function (req, res) {
	console.log("put id:"+req.params.issueid);
	console.log("put isIssue:"+req.params.isIssue);

	var issue = {_id:req.params.issueid,isIssue:req.params.isIssue};
	Issue.update(issue,function(result){
		//res.json(result); 
		res.send('update ok');
	});
	/*	
	var body = '', jsonStr;
	req.on('data', function (chunk) {
		console.log("on data:"+ chunk);

		body += chunk; //读取参数流转化为字符串
	});
	
	req.on('end', function () {
		try {
			console.log("put body:"+ body);

			var issue = eval('('+body+')');
			Issue.update(issue,function(result){
				res.json(result);
			});
		} catch (err) {
			console.log(err);
		}
	});
	*/
});





module.exports = router;