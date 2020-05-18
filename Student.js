const Datastore = require('nedb');
class student {
    constructor(dbfp){
        if(dbfp){
            this.db = new Datastore({filename: dbfp, autoload: true});
        }else{
            this.db = new Datastore();
        }
    }
    init() {
        this.db.insert({user: 'user',password:'password',fullname:'fullname',age:21, programme:'BSc(Hons) Computing'
        }, function (error) {
            if (eror) {
                console.log('Eror when inserting a document in the database', error);
            } else {
                console.log('Student inserted in the database');
            }
        });
    };
    addStudent(user, password, age,programme, fullname, ) {
        return new Promise((reject,resolve) => {
            var entry = {user:user,password:password,age: age,programme: programme,fullname: fullname};
                this.db.insert(entry, function (error, student) {
                if (error) {
                    console.log("Error occured when inserting document in the database", error);
                    reject(error);
                } else {
                    console.log('the student added:', user);
                    resolve(student);
                }
            });
        });
    }
    getStudents() {
            return new Promise((resolve, reject) => {
                this.db.find({}, function (error, entry) {
                    if (error) {reject(error);
                        console.log('getStudents Promise is rejected');
                    } else {resolve(entry);
                        console.log('getStudents Promise is resolved');
                    }
                });
            });
        }
     login(user, password) {
            return new Promise((resolve, reject) => {
                this.db.find({ "user": user, "password": password }, function (error, student) {
                    if (error) {console.log('The login is rejected for ', user);
                        reject(err);
                    } else {console.log('The login is resolved for ', student);
                        resolve(student);
                    }
                });
            });
        }
    }
module.exports = student;    