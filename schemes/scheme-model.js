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
    return db('steps')
        .join('schemes', 'schemes.id', 'steps.scheme_id')
        .select('schemes.id', 'schemes.scheme_name', 'steps.step_number', 'steps.instructions')
        .where('steps.scheme_id', id)
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