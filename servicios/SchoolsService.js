const MongoLib = require('../lib/mongo');

class SchoolsService {
    constructor() {
        this.collection = 'schools'; 
        this.mongoDB = new MongoLib(); 
    }
    async getSchools(){
        const schools = await this.mongoDB.getSchools(this.collection)
        return schools || []
    }
    async insertSchool( data){    
        const mensaje  = await this.mongoDB.insert(this.collection, data)
        return mensaje || []
    }
   async updateSchool(id, updateFields){
        try {
            const result = await this.mongoDB.updateSchool(this.collection, id, updateFields);
            return result || [];
        } catch (error) {
            console.error("Error updating school details:", error);
            throw error; // Relanzar el error para manejo posterior si fuera necesario
        }
    }
}
module.exports = SchoolsService