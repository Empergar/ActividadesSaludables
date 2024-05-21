const express = require('express')
const SchoolsService = require('../servicios/SchoolsService')

function schoolsAPI(app){
    const router = express.Router()

    app.use('/api/schools', router)
    const schoolsService = new SchoolsService()

    router.get('/', async function (req, res, next){
        try{
            const schools = await schoolsService.getSchools()
            res.status(200).json(
                {
                    data: schools,
                    message: 'datos de colegios recuperados con éxito'
                }
            )
        } catch(err){
            console.log(`se produjo un error ${err}`)
        } 
    })

    router.post('/', async function (req, res, next){
        try{
            const {body: school} = req; 

            const idSchoolAnadido = await schoolsService.insertSchool(school)
            res.status(201).json(
                {
                    data: idSchoolAnadido,
                    message: 'datos de colegio recuperados con éxito'
                }
            )
        } catch(err){
            console.log(`se produjo un error ${err}`)
            next(err)
        } 
    })

    router.put('/:schoolId', async function (req, res, next){
        try{
            const schoolId = req.params.schoolId; 
            const updateFields = req.body; 
            console.log(`updateFields ${updateFields}`) 

            console.log(`modificando ${schoolId}`)
            const schoolIdModificado = await schoolsService.updateSchool(schoolId, updateFields)
            res.status(201).json(
                {
                    data: schoolIdModificado,
                    message: 'datos de colegio modificados con éxito'
                }
            )
        } catch(err){
            console.log(`se produjo un error ${err}`)
            next(err)
        } 
    })

}
module.exports = schoolsAPI
