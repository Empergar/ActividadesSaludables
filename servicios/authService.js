const MongoLib = require('../lib/mongo');

class authService {
    constructor() {
        this.collection = 'usuarios'; // Especifica la colección de usuarios en MongoDB.
        this.mongoDB = new MongoLib(); // Instancia de la clase que maneja las operaciones de MongoDB.
    }
    async getUsuarios(){
        const users = await this.mongoDB.getUsuarios(this.collection)
        return users || []
    }
    async getUsuarioByEmail(email){
        const user = await this.mongoDB.getUsuarioByEmail(this.collection, email)
        return user || []
    }
    async insertUsuario(data){    
        const mensaje  = await this.mongoDB.insert(this.collection, data)
        return mensaje || []
    }
    
}
module.exports = authService;