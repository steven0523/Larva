var servers= [
{OTAP:'T', DC:'TC3', name:'WESB-T-AP001', domains:['BIJS','REIS']},
{OTAP:'A', DC:'TC3', name:'WESB-A-ES002', domains:['BIJS','REIS']},
{OTAP:'A', DC:'TC3', name:'WESB-A-ES004', domains:['BIJS','REIS']},
{OTAP:'A', DC:'TC3', name:'WESB-A-MQ002', domains:['BIJS']       },
{OTAP:'A', DC:'TC4', name:'WESB-A-MQ004', domains:['BIJS']       },
{OTAP:'A', DC:'TC3', name:'WESB-A-DM002', domains:['BIJS','REIS']},
{OTAP:'A', DC:'TC4', name:'WESB-A-ES006', domains:['BIJS','REIS']},
{OTAP:'A', DC:'TC4', name:'WESB-A-ES008', domains:['BIJS','REIS']},
{OTAP:'A', DC:'TC3', name:'WESB-A-MQ006', domains:['BIJS']       },
{OTAP:'A', DC:'TC4', name:'WESB-A-MQ008', domains:['BIJS']       },
{OTAP:'A', DC:'TC4', name:'WESB-A-DM006', domains:['BIJS','REIS']},
{OTAP:'P', DC:'TC3', name:'WESB-P-ES002', domains:['BIJS']       },
{OTAP:'P', DC:'TC3', name:'WESB-P-ES006', domains:['BIJS']       },
{OTAP:'P', DC:'TC3', name:'WESB-P-DM004', domains:['BIJS']       },
{OTAP:'P', DC:'TC3', name:'WESB-P-ES010', domains:['REIS']       },
{OTAP:'P', DC:'TC3', name:'WESB-P-ES014', domains:['REIS']       },
{OTAP:'P', DC:'TC3', name:'WESB-P-DM002', domains:['REIS']       },
{OTAP:'P', DC:'TC3', name:'WESB-P-MQ002', domains:['BIJS']       },
{OTAP:'P', DC:'TC4', name:'WESB-P-MQ004', domains:['BIJS']       },
{OTAP:'P', DC:'TC4', name:'WESB-P-ES004', domains:['BIJS']       },
{OTAP:'P', DC:'TC4', name:'WESB-P-ES008', domains:['BIJS']       },
{OTAP:'P', DC:'TC4', name:'WESB-P-DM008', domains:['BIJS']       },
{OTAP:'P', DC:'TC4', name:'WESB-P-ES016', domains:['REIS']       },
{OTAP:'P', DC:'TC4', name:'WESB-P-ES012', domains:['REIS']       },
{OTAP:'P', DC:'TC4', name:'WESB-P-DM006', domains:['REIS']       },
{OTAP:'P', DC:'TC3', name:'WESB-P-MQ006', domains:['BIJS']       },
{OTAP:'P', DC:'TC4', name:'WESB-P-MQ008', domains:['BIJS']       },
{OTAP:'T', DC:'APL', name:'SU025V383',    domains:['OVCP']       },
{OTAP:'A', DC:'APL', name:'SU025V418',    domains:['OVCP']       },
{OTAP:'A', DC:'APL', name:'SU025V419',    domains:['OVCP']       },
{OTAP:'A', DC:'APL', name:'SU025V420',    domains:['OVCP']       },
{OTAP:'A', DC:'APL', name:'SU025V421',    domains:['OVCP']       },
{OTAP:'A', DC:'APL', name:'SU025V422',    domains:['OVCP']       },
{OTAP:'A', DC:'AMS', name:'SU025V423',    domains:['OVCP']       },
{OTAP:'A', DC:'AMS', name:'SU025V424',    domains:['OVCP']       },
{OTAP:'A', DC:'AMS', name:'SU025V425',    domains:['OVCP']       },
{OTAP:'A', DC:'AMS', name:'SU025V426',    domains:['OVCP']       },
{OTAP:'A', DC:'AMS', name:'SU025V427',    domains:['OVCP']       },
{OTAP:'P', DC:'APL', name:'SU025V252',    domains:['OVCP']       },
{OTAP:'P', DC:'APL', name:'SU025V253',    domains:['OVCP']       },
{OTAP:'P', DC:'APL', name:'SU025V255',    domains:['OVCP']       },
{OTAP:'P', DC:'APL', name:'SU025V256',    domains:['OVCP']       },
{OTAP:'P', DC:'APL', name:'SU025V257',    domains:['OVCP']       },
{OTAP:'P', DC:'AMS', name:'SU025V236',    domains:['OVCP']       },
{OTAP:'P', DC:'AMS', name:'SU025V237',    domains:['OVCP']       },
{OTAP:'P', DC:'AMS', name:'SU025V239',    domains:['OVCP']       },
{OTAP:'P', DC:'AMS', name:'SU025V240',    domains:['OVCP']       },
{OTAP:'P', DC:'AMS', name:'SU025V241',    domains:['OVCP']       },
{OTAP:'A', DC:'AMS', name:'SU025V229',    domains:['NEDT','DPK'] },
{OTAP:'A', DC:'AMS', name:'SU025V230',    domains:['NEDT','DPK'] },
{OTAP:'A', DC:'AMS', name:'SU025V231',    domains:['NEDT','DPK'] },
{OTAP:'A', DC:'AMS', name:'SU025V232',    domains:['NEDT','DPK'] },
{OTAP:'A', DC:'AMS', name:'SU025V233',    domains:['NEDT','DPK'] },
{OTAP:'P', DC:'AMS', name:'SU025V234',    domains:['NEDT','DPK'] },
{OTAP:'P', DC:'AMS', name:'SU025V235',    domains:['NEDT','DPK'] },
{OTAP:'P', DC:'AMS', name:'SU025V238',    domains:['NEDT','DPK'] },
{OTAP:'T', DC:'APL', name:'SU025V134',    domains:['NEDT','DPK'] },
{OTAP:'A', DC:'APL', name:'SU025V242',    domains:['NEDT','DPK'] },
{OTAP:'A', DC:'APL', name:'SU025V243',    domains:['NEDT','DPK'] },
{OTAP:'A', DC:'APL', name:'SU025V245',    domains:['NEDT','DPK'] },
{OTAP:'A', DC:'APL', name:'SU025V244',    domains:['NEDT','DPK'] },
{OTAP:'A', DC:'APL', name:'SU025V246',    domains:['NEDT','DPK'] },
{OTAP:'P', DC:'APL', name:'SU025V250',    domains:['NEDT','DPK'] },
{OTAP:'P', DC:'APL', name:'SU025V251',    domains:['NEDT','DPK'] },
{OTAP:'P', DC:'APL', name:'SU025V254',    domains:['NEDT','DPK'] }];


function contains(arr, obj) {
    var i = arr.length;  
    while (i--) {  
        if (arr[i] == obj) {  
            return true;  
        }  
    }  
    return false;  
}  

function NSRealm () {
}

NSRealm.prototype.getServerByName = function (name) {
	for (var i = 0; i < servers.length; i++) {
		var server = servers[i];
		if(server.name == name){
			return server;
		}　
	}
}

NSRealm.prototype.getServers = function (cell) {
	var tasks=[];
	console.log(cell);	
	for (var i = 0; i < servers.length; i++) {
		var server = servers[i];

		if( server.OTAP.indexOf(cell.OTAP?cell.OTAP:'') > -1 
			&& server.DC.indexOf(cell.DC?cell.DC:'') > -1
			&& (cell.domain?contains(server.domains,cell.domain):true)){
			if(cell.domain){
				var svr = JSON.parse(JSON.stringify(server));
				svr.domain = cell.domain;
				delete svr.domains;
				tasks.push(svr);
			}else{
				for(var j=0;j<server.domains.length;j++){
					var svr = JSON.parse(JSON.stringify(server));
					svr.domain = server.domains[j];
					delete svr.domains;
					tasks.push(svr);
				}
			}
		}　
	}
	return tasks;
}


module.exports = new NSRealm();






