const express = require('express')
const ActivitiesService = require('../servicios/ActivitiesService')

function activitiesAPI(app){
    const router = express.Router()

    app.use('/api/activities', router)
    const activitiesService = new ActivitiesService()

    router.get('/', async function (req, res, next){
        try{
            const atividades = await activitiesService.getActividades()
            res.status(200).json(
                {
                    data: atividades,
                    message: 'datos de actividades recuperados con éxito'
                }
            )
        } catch(err){
            console.log(`se produjo un error ${err}`)
        } 
    })

    router.post('/', async function (req, res, next){
        try{
            const {body: activity} = req; 

            const idActivityAnadido = await activitiesService.insertActivity(activity)
            res.status(201).json(
                {
                    data: idActivityAnadido,
                    message: 'datos de la actividad recuperados con éxito'
                }
            )
        } catch(err){
            console.log(`se produjo un error ${err}`)
            next(err)
        } 
    })

    router.put('/validation/:id', async function (req, res, next){
        try{
            const activityId = req.params.id; 
            const validation = req.body.validation
            const discard = req.body.discard
            console.log(`validation ${validation}`) 

            console.log(`modificando ${activityId}`)
            const activityIdModificado = await activitiesService.modifyActivityValidation(activityId, validation, discard)
            res.status(201).json(
                {
                    data: activityIdModificado,
                    message: 'datos de actividad modificados con éxito'
                }
            )
        } catch(err){
            console.log(`se produjo un error ${err}`)
            next(err)
        } 
    })

    router.put('/discard/:id', async function (req, res, next){
        try{
            const activityId = req.params.id; 
            const validation = req.body.validation
            const discard = req.body.discard
            console.log(`discard ${validation}`) 

            console.log(`modificando discard ${activityId}`)
            const activityIdModificado = await activitiesService.modifyActivityValidation(activityId, validation, discard)
            res.status(201).json(
                {
                    data: activityIdModificado,
                    message: 'datos de actividad modificados con éxito'
                }
            )
        } catch(err){
            console.log(`se produjo un error ${err}`)
            next(err)
        } 
    })
}
module.exports = activitiesAPI
