const MongoLib = require('../lib/mongo');

class ActivitiesService {
    constructor() {
        this.collection = 'activities'; 
        this.mongoDB = new MongoLib(); 
    }
    async getActividades(){
        const activities = await this.mongoDB.getActividades(this.collection)
        return activities || []
    }
    async insertActivity( data){    
        const mensaje  = await this.mongoDB.insert(this.collection, data)
        return mensaje || []
    }
    async modifyActivityValidation(id, validation, discard){
        const mensaje  = await this.mongoDB.modifyValidateActivity(this.collection, id, validation, discard)
        return mensaje || []
    }

}
module.exports = ActivitiesService