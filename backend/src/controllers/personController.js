const person = require('../schemas/person')

module.exports = {
    async create(request, response){
        const newPerson = request.body

        await person.create(newPerson)
        person.findOne(newPerson).then(
            e => response.send(e)
        )
        
    },

    async list(request, response){
        person.find({}).then(
            doc => response.send(doc)
        )
    },

    async delete(request, response){
        const {id} = request.params

        person.deleteOne({_id: id}).then(
            response.status(200).send()
        )
    },

    async update(request, response){
        const {id} = request.params

        const log = await person.findOneAndUpdate(
            {_id: id},
            request.body,
            {}
        )
        log ?
        response.status(200).send() :
        response.status(400).send()
    }
}