var  mongodb = require('mongodb');

//9.112.132.90  9.112.128.59
var  server  = new mongodb.Server('9.112.132.90', 27017, {auto_reconnect:true});
var  db = new mongodb.Db('larva', server, {safe:true});


function MongoDao( table ){
	this.table = table;
};

db.open(function(err,db){
     if(!err)
     {   
         console.log('connect');
     }else{
         console.log(err);
     }   
	 
	 MongoDao.prototype.save = function save(object, callback) {
		db.collection( this.table, {safe:true}, function(err, collection){
			if(!err){
				 collection.save( object, function(err,rest){
				 callback ( {result:"OK"} );
				 }); 				 
			}else{
				callback ( err );
			}
		});

	};


	MongoDao.prototype.query = function query(q, callback){
		
		db.collection(this.table, {safe:true}, function(err, collection){
			if(!err){
				collection.find(q).toArray(function(err,docs){
					callback (docs);
				}); 				 
			}else{
				callback (  );
			}
		});
	};
	
	MongoDao.prototype.getByID = function getByID(id, callback){
		db.collection(this.table, {safe:true}, function(err, collection){
			if(!err){
				var objID = mongodb.ObjectID(id);
				console.log("obj:"+objID);
				
				collection.findOne({_id: objID },function(err,doc){
					console.log("project returned"+doc);
					callback (doc);
				}); 				 
			}else{
				console.log("error:"+err);

				callback ( err );
			}
		});
	};


    MongoDao.prototype.updateByID = function updateByID(id, object, callback){
        db.collection(this.table, {safe:true}, function(err, collection){
            if(!err){
                var objID = mongodb.ObjectID(id);
                delete object.id;
                console.log("obj:"+objID);

                collection.update({_id: objID },{$set:object}, function(err,doc){
                    console.log("project returned"+doc);

                    callback (doc);
                });
            }else{
                console.log("error:"+err);

                callback ( err );
            }
        });
    };

	
	
	MongoDao.prototype.update = function update(object, callback){
		db.collection(this.table, {safe:true}, function(err, collection){
			if(!err){
				var objID = mongodb.ObjectID(object._id);
				delete object._id;
				collection.update({_id:objID},{$set:object},{safe:true},function(err,result){
					callback({result:"OK"});
				});
			}else{
				console.log("error:"+err);

				callback ( err );
			}
		});
	};

 
});

function mongoDao(table){
	return new MongoDao(table);
}

module.exports = mongoDao;


