/**
 * Created by steven on 7/12/17.
 */
var express = require('express');
var router = express.Router();
var Diagnosis = require('../models/diagnosis.js');


router.get('/', function (req, res) {
    Diagnosis.getDiagnosises({},function(diagnosises){
        res.json(diagnosises);
    });
});

router.get('/:diagnosisid', function (req, res) {
    Diagnosis.getDiagnosis(req.params.diagnosisid,function(diagnosis){
        res.json(diagnosis);
    });
});

router.post('/', function (req, res) {
    var body = '', jsonStr;
    var diagnosis;
    if(!req.body){
        req.on('data', function (chunk) {
            body += chunk; //读取参数流转化为字符串
        });

        req.on('end', function () {
            try {
                diagnosis = eval('('+body+')');
                Diagnosis.save(diagnosis,function(result){
                    res.json(result);
                });
            } catch (err) {
                console.log(err);
            }
        });
    }else{
        diagnosis = req.body;
        Diagnosis.save(diagnosis,function(result){
            res.json(result);
        });
    }
});

router.put('/', function (req, res) {
    var body = '', jsonStr;
    var diagnosis = req.body;
    var id;
    console.log('diagnosis = ' + diagnosis);
    if(!diagnosis){
        req.on('data', function (chunk) {
            diagnosis += chunk; //读取参数流转化为字符串
        });

        req.on('end', function () {
            try {
                var content = eval('('+diagnosis+')');
                id = content.id;
                console.log('diagnosis id = ' + id);
                Diagnosis.update(id, content.context,function(result){
                    res.json(result);
                });
            } catch (err) {
                console.log(err);
            }
        });
    }else{
        id = diagnosis.id;
        Diagnosis.update(id, diagnosis.context,function(result){
            res.json(result);
        });
    }

});

module.exports = router;
