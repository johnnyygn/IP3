const Datastore = require('nedb');
    class coursework {
        constructor(dbfp){
            if(dbfp){
                this.db = new Datastore({filename: dbfp, autoload: true});}
            else {
                this.db = new Datastore();
            }    
            
        }
        init(){
            this.db.insert({
                name: 'Coursework', module: 'Module', milestones:'milestones',duedate: '25.05.2020', completiondate:'24.05.2020', usern:'user', completed: false},
                function (error, coursework) {
                    if(error) {
                        console.log('Error while adding coursework int the database', error);
                    }
                    else {
                        console.log('Coursework added in the database' + coursework);}
                    }   
                );
        };
        addCoursework(name, module, milestones, duedate, completiondate, user){
            return new Promise((resolve, reject) =>{
                var entry = {name: name,module: module, milestones: milestones, duedate: duedate, completiondate: completiondate, user: user, completed:};
            this.db.insert(entry, function(error, coursework){
                if(error) {
                    console.log('Document not added in database', error);
                    reject(error);
                }
                else {
                    console.log('Add the coursework:', coursework);
                    resolve(coursework);
                }
            });
        });
    }
    getCourseworks(user) {
        return new Promise((reject,resolve) =>{
            this.db.find({'user':user},function(error, entry){
                if (error){
                    reject(error);
                    console.log('getCourseworks promise is rejected', error);
                }
                else{
                    resolve(entry);
                    console.log('getCourseworks promise is resolved');
                }
            });
        });
    }
    getCoursework(user, courseworkid){
        return new Promise((reject, resolve) => {
            this.db.find({'id':courseworkid, 'user':user}, function(error, entry){
                if(error){
                    reject(error);
                    console.log('getCoursework Promise is rejected', error);
                }
                else {
                    resolve(entry);
                    console.log('getCoursework Promise is resolved');
                }
            });
        });
    }
    updateCoursework(coursework, user) {
        return new Promise((reject, resolve) =>{
            let courseworkid = coursework._id, newName = coursework.name, newMilestones = coursework.milestones, newDueDate = coursework.duedate, newCompletionDate = coursework.completiondate;
            this.db.update({'id':courseworkid,'user':user},{$set: {'name':newName,'milestones':newMilestones,'duedate':newDueDate,'completiondate':newCompletionDate,'completed':coursework.completed}},
            function (error, numberReplaced){
                if (error){
                    console.log('Error when updating coursework',name,error);
                    reject(error);
                }
                else{
                    resolve.log('Coursework updated');
                    resolve(numberReplaced);
                }
            });
        });
    }
    shareCoursework(courseworkid, user, sharingUser){
        return new Promise((reject,resolve) => {
            let that = this;
            this.db.find({'use':user, 'id':courseworkid}, function (error, entry){
                if (error){
                    reject(error);
                    console.log('Rejected while share', error);
                } else {
                    var entry = {
                        name:entry[0].name,milestones:entry[0].milestones,duedate:entry[0].duedate,completiondate:entry[0].completiondate,completed:entry[0].completed,user:sharingUser
                    };
                    that.db.insert(entry, function (error, coursework) {
                        if (error) {
                            console.log('Error when insert document in the database', error);
                            reject(error);
                        } else {
                            console.log('Coursework shared:', coursework);
                            resolve(coursework);
                        }
                    });
                }
            });
        });
    }
    deleteCoursework(courseworkid, user) {
        return new Promise((reject,resolve) => {
            this.db.remove({ 'id': courseworkid, 'user': user}, function (error, numberRemoved){
                if (error){
                    console.log('Error when deleting coursework', courseworkid, error);
                    reject(error);
                }
                else {
                    console.log('Delete Coursework:', courseworkid, numberRemoved);
                    resolve(numberRemoved);
                }
            });
        });
    }


}
module.exports = coursework;