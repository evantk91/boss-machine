const express = require('express');
const minionsRouter = express.Router();

const {
    getAllFromDatabase,
    addToDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    createWork
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

minionsRouter.get('/:minionId/work', (req, res, next) => {
   let minionWork = getAllFromDatabase('work').filter((minionId) => {
       minionId === req.params.minionId
   })
   res.status(200).send(minionWork);
});

minionsRouter.post('/:minionId/work', (req, res, next) => {
   const addedWork = req.body;
   addedWork.minionId = req.params.minionId;
   const createdWork = addToDatabase('work', addedWork);
   res.status(201).send(createdWork);
});

minionsRouter.param('workId', (req, res, next, id) => {
   const work = getFromDatabaseById('work', id);
   if(work) {
      req.work = work;
      next();
   } else {
      res.status(404).send();
   }   
});

minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
   if(req.params.minionId !== req.body.minionId) {
      res.status(400).send();
   } else {
      updatedWork = updateInstanceInDatabase('work', req.body);
      res.send(updatedWork);
   }
});

module.exports = minionsRouter;