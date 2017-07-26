var mongoDao = require('./mongodao');
var issueDao = mongoDao('issues');

function Issue(){

};

Issue.save = function save(issue, callback) {
	issueDao.save(issue,callback);
};

Issue.getIssue = function getIssue(id, callback) {
    issueDao.getByID(id,function(result){
		callback(result);
	});
};


Issue.update = function update(issue, callback) {
	issueDao.update(issue,callback);
};

module.exports = Issue;


