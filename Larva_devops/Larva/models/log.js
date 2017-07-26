var  mongoDao = require('./mongodao');
var logDao = mongoDao('logs');

function Log(){

};

Log.save = function save(log, callback) {
	logDao.save(log,callback);
};

Log.getLogs = function getLogs(q, callback) {
	logDao.query(q,callback);
};

Log.getLog = function getLog(id, callback) {
	logDao.getByID(id,function(logResult){
		callback(logResult);
	});
};

Log.upload = function upload(log, callback) {
	logDao.save(log,callback);
	
};



module.exports = Log;


