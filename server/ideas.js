const express = require('express');
const ideasRouter = express.Router();

const {
   getAllFromDatabase,
   getFromDatabaseById,
   addToDatabase,
   updateInstanceInDatabase,
   deleteFromDatabasebyId
} = require('./db');

const checkMillionDollarIdea = require('./checkMillionDollarIdea');

ideasRouter.param('ideaId', (req, res, next, id) => {
   const idea = getFromDatabaseById('ideas', id);
   if (idea) {
      req.idea = idea;
      next();   
   } else {
      res.status(404).send(); 
   }
});

ideasRouter.get('/', (req, res, next) => {
   const ideas = getAllFromDatabase('ideas');
   res.status(200).send(ideas);
});

ideasRouter.get('/:ideaId', (req, res, next) => {
   res.status(200).send(req.idea);          
});

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
   const newIdea = addToDatabase('ideas', req.body);
   res.status(201).send(newIdea)
});

ideasRouter.put('/:ideaId', (req, res, next) => {
   let updated = updateInstanceInDatabase('ideas', req.body);
   res.status(200).send(updated);
});

ideasRouter.delete('/:ideaId', (req, res, next) => {
   let deleted = deleteFromDatabasebyId('ideas', req.params.ideaId);
   if(deleted) {
      res.status(204).send();
   } else {
      res.status(404).send();      
   }
});

module.exports = ideasRouter;