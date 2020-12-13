const express = require('express');
const minionsRouter = express.Router();

const {
    getAllFromDatabase,
    addToDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
} = require('./db.js');

minionsRouter.param('minionId', (req, res, next, id) => {
   const minion = getFromDatabaseById('minions', id);
   if(minion) {
      req.minion = minion;
      next();
   } else {
      res.status(404).send();
   }
});

minionsRouter.get('/', (req, res, next) => {
   const minions = getAllFromDatabase('minions');
   res.status(200).send(minions);
});

minionsRouter.get('/:minionId', (req, res, next) => {
   res.status(200).send(req.minion);
});

minionsRouter.put('/:minionId', (req, res, next) => {
   let updated = updateInstanceInDatabase('minions', req.body);
   res.status(200).send(updated); 
});

minionsRouter.post('/', (req, res, next) => {
   const newMinion = addToDatabase('minions', req.body);
   res.status(201).send(newMinion);   
});

minionsRouter.delete('/:minionId', (req, res, next) => {
   let deleted = deleteFromDatabasebyId('minions', req.params.minionId);
   if (deleted) {
      res.status(204).send();
   } else {
      res.status(404).send();       
   }
});

module.exports = minionsRouter;