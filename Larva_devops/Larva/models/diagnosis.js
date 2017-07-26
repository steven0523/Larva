/**
 * Created by steven on 7/12/17.
 */
var mongoDao = require('./mongodao');
var diagnosisDao = mongoDao('diagnosises');

function Diagnosis(){

};

Diagnosis.save = function save(diagnosis, callback) {
    diagnosisDao.save(diagnosis,callback);
};

Diagnosis.getDiagnosises = function getDiagnosises(q, callback) {
    diagnosisDao.query(q,callback);
};

Diagnosis.getDiagnosis = function getDiagnosis(id, callback) {
    diagnosisDao.getByID(id,function(diagnosisResult){
        console.log('id = ' + id);
        callback(diagnosisResult);
    });
};

Diagnosis.update = function update(id, diagnosis, callback) {
    diagnosisDao.updateByID(id, diagnosis,callback);

};

module.exports = Diagnosis;
