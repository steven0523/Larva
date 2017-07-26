

var bodyParser = require('body-parser');

var dbName = 'larva';

var express = require('express');
var app = express();
var session = require('express-session');
var flash = require('connect-flash');

var URI_PREFIX = '/larvaAPIs';

var  mongodb = require('mongodb');
var  server  = new mongodb.Server('9.112.132.90', 27017, {auto_reconnect:true});
var  db = new mongodb.Db('larva', server, {safe:true});

var https = require('https');
var fs = require('fs');


app.use(flash());
app.use(session({ cookie: { maxAge: 60000 },
    secret: 'woot',
    resave: false,
    saveUninitialized: false}));

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get(URI_PREFIX + '/getLogs', function(req, res){
    db.open(function(err,db){
        if(!err)
        {
            //console.log('connected');
            db.createCollection('logs', {safe:true}, function(err, collection){
                if(!err){
                    collection.find({},{}).sort({users:1}).toArray(function(err,result){
                        if (err){
                            //console.log("find logs failed, err = " + err);

                        }
                        else {
                            //console.log("find logs successfully");
                            //console.log('result = ' + JSON.stringify(result));
                            res.send(JSON.stringify(result));
                            db.close();
                        }


                    });
                }else{
                    console.log("error find logs!");

                }
            });
        }else{
            console.log(err);
        }
    });

});

app.post(URI_PREFIX + '/addLogs',function(req, res){
    var data = JSON.stringify(req.body);
    console.log('data = ' + data);
    db.open(function(err,db){
        if(!err)
        {
            db.createCollection('logs', {safe:true}, function(err, collection){
                if(!err){
                    collection.insert(req.body, function(err,result){
                        if (err){
                            console.log("insert logs failed, err = " + err);

                        }
                        else {
                            console.log("insert logs successfully");
                            res.json(result);
                            db.close();
                        }


                    });
                }else{
                    console.log("error inserting logs");

                }
            });
        }else{
            console.log(err);
        }
    });
});


app.get(URI_PREFIX + '/getIssueDetails/:id', function (req, res) {
    var id = req.params.id;
    console.log('issue id = ' + id);
    db.open(function(err, db){
        if(!err)
        {
            db.createCollection('issues', {safe:true}, function(err, collection){
                if(!err){
                    collection.findOne({_id: mongodb.ObjectId(id)}, function(err,result){
                        if (err){
                            console.log("find issue detail failed, err = " + err);

                        }
                        else {

                            //res.json(result);
                            res.send(JSON.stringify(result));
                            db.close();
                        }


                    });
                }else{
                    console.log("error finding issue detail");

                }
            });
        }else{
            console.log(err);
        }
    });
});

app.get(URI_PREFIX + '/getIssues/:beginIndex/:count', function(req, res){
    var beginIndex = parseInt(req.params.beginIndex);
    var count = parseInt(req.params.count);
    console.log('beginIndex = ' + beginIndex + ' count = ' + count);
    db.open(function(err,db){
        if(!err)
        {
            console.log('connected');
            db.createCollection('issues', {safe:true}, function(err, collection){
                if(!err){
                    //collection.find({isIssue:{$ne:"false"}}).sort({issues:1}).toArray(function(err,result)
                    collection.find({isIssue:{$ne:"false"}}).sort({'checkTime':-1}).skip(beginIndex).limit(count).toArray(function(err,result){
                        if (err){
                            //console.log("find issues failed, err = " + err);

                        }
                        else {
                            //console.log("find issues successfully");
                            //console.log('result = ' + JSON.stringify(result));
                            res.send(JSON.stringify(result));
                            db.close();
                        }


                    });
                }else{
                    console.log("error find issues");

                }
            });
        }else{
            console.log(err);
        }
    });
});

app.post(URI_PREFIX + '/addIssues',function(req, res){
    var data = JSON.stringify(req.body);
    console.log('data = ' + data);
    //var replacement = /./;
    //var newData = data.replace(replacement, "\uff0E");
    //console.log('newData = ' + newData);
    //var finalData = JSON.parse(newData);
    db.open(function(err,db){
        if(!err)
        {
            db.createCollection('issues', {safe:true}, function(err, collection){
                if(!err){
                    collection.insert(req.body, function(err,result){
                        if (err){
                            console.log("insert issues failed, err = " + err);

                        }
                        else {
                            console.log("insert issues successfully");
                            var outcome = {"result":"success"}
                            //res.json(result);
                            res.send(outcome);
                            db.close();
                        }


                    });
                }else{
                    console.log("error inserting issues");

                }
            });
        }else{
            console.log(err);
        }
    });
});










var nsrealm = require('./routes/nsrealm');
var upload = require('./routes/uploadfile');
var log = require('./routes/logservice');
var issue = require('./routes/issueservice');
var diagnosis = require('./routes/diagnosisservice');

app.use('/nsrealm', nsrealm);
app.use('/upload', upload);
app.use('/logs', log);
app.use('/issues', issue);
app.use('/diagnosises', diagnosis);

const credentials = {
    key: fs.readFileSync("./certifications/gpsemmavm02.austin.ibm.com.key", "utf8"),
    cert: fs.readFileSync("./certifications/gpsemmavm02.austin.ibm.com.crt", "utf8")
}

https.createServer(credentials, app)
    .listen(8888, function() {
        console.log("server running on port 8888");
});


