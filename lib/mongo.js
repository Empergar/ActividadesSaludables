const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId


const USER = 'eperezga' //process.env.USER
const PASSWORD = 'adminpass' //process.env.PASSWORD
const DB_NAME = 'actividadesSaludables' //process.env.DB_NAME
const DB_HOST = 'cluster0.e77w6tf.mongodb.net' ////process.env.DB_HOST


//mongodb+srv://eperezga:<password>@cluster0.e77w6tf.mongodb.net/
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${DB_HOST}/?appName=${DB_NAME}`

class MongoLib {
    constructor(){
        this.veces = 0;
    }

    async connect() {
            this.veces++;     
            console.log(`Connect invocado ${this.veces} veces`);

            if (MongoLib.connection != null) {
                console.log('Conexión ya establecida')
                return MongoLib.connection.db(DB_NAME);
            } else {
                try {
                    MongoLib.connection = await MongoClient.connect(MONGO_URI)
                    return MongoLib.connection.db(DB_NAME)
                } catch(e){
                    console.log('Error en conexión a BBDD')
                    return e
                }
            }
    }
    async  getActividades(collection) {
        try {
            let db = await this.connect()
            let result = await db.collection(collection).find().toArray();
            console.log(result)
            return result;
        } catch (e) {
            return e;
        }
    }

    async  getUsuarios(collection) {
        try {
            let db = await this.connect()
            let result = await db.collection(collection).find().toArray();
            console.log(result)
            return result;
        } catch (e) {
            return e;
        }
    }

    async getUsuarioByEmail(collection, email) {
        try {
            const db = await this.connect();
            const result = await db.collection(collection).findOne({ email: email });
            return result;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    async  getSchools(collection) {
        try {
            let db = await this.connect()
            let result = await db.collection(collection).find().toArray();
            console.log(result)
            return result;
        } catch (e) {
            return e;
        }
    }

    async insert(collection, data) {
        try {
                let db = await this.connect()
                let result = await db.collection(collection).insertOne(data)
                return result.insertedId
         } catch(e){
            console.log('error al insertar')
            return e
         }
    }

    async modifyValidateActivity(collection, id, validation, discard){
        let db;
        try {
            db = await this.connect();

            id = Number(id);
            let documentExists = await db.collection(collection).findOne({ id: id });
            if (!documentExists) {
                throw new Error('No document found with the given ID');
            }

            let result = await db.collection(collection).updateOne(
                { id: id },
                { $set: { validation: validation, discard: discard } }
            );
    
            return result;
        } catch(e) {
            console.log('Error al modificar:', e.message);  
            throw e;  
        }
    }

    async updateSchool(collection, id, updateFields) {
    try {
        const db = await this.connect(); 

        let updateData = {};
        Object.keys(updateFields).forEach(key => {
            if (updateFields[key] !== undefined && key !== '_id') { 
                updateData[key] = updateFields[key];
            }
        });

        let documentId = parseInt(id);
        if (isNaN(documentId)) {
            throw new Error("Invalid ID format");
        }

        let result = await db.collection(collection).updateOne(
            { id: documentId },
            { $set: updateData }
        );

        return result;
    } catch (error) {
        console.error("Error updating document with ID:", id, error);
        throw error;
    }
}    
    
}
module.exports = MongoLib;


