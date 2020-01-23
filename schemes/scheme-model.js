const db = require('../data/dbConfig');

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}

function find() {
    return db('schemes')
} 

function findById(id) {
    return db('schemes')
    .where({ id })
    .first()
}

function findSteps(id) {
    return db('schemes')
        .join('steps', 'schemes.id', 'steps.scheme_id')
        .where('schemes.id', id)
        .select('scheme.id', 'steps.scheme_name', 'steps.step_number', 'step.instructions')
} 

function add(scheme) {
    return db('schemes')
        .returning('id')
        .insert(scheme)
        .then(([id]) => {
            return findById(id)
        })
} 

function update(changes, id) {
    return db('schemes')
        .returning('id')
        .where({ id })
        .update(changes)
        .then(([id]) => {
            return findById(id)
        })
} 

function remove(id) {
    return db('schemes')
        .where({ id })
        .del()
} 