const express = require('express');
const meetingsRouter = express.Router();

const {
   getAllFromDatabase,
   addToDatabase,
   createMeeting,
   deleteAllFromDatabase
} = require('./db')

meetingsRouter.get('/', (req, res, next) => {
   const meetings = getAllFromDatabase('meetings');
   res.status(200).send(meetings);
});

meetingsRouter.post('/', (req, res, next) => {
   const newMeeting = createMeeting();
   addToDatabase('meetings', newMeeting);
   res.status(201).send(newMeeting);
});

meetingsRouter.delete('/', (req, res, next) => {
    deleteAllFromDatabase('meetings');
    res.status(204).send()
})

module.exports = meetingsRouter;