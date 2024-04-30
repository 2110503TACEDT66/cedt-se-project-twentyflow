/** 
* @swagger
* components:
*  schemas:
*     Appointment:
*       type: object
*       required:
*         - date
*         - startTime
*         - endTime
*         - room
*         - coWorking
*         - additional
*       properties:
*         date:
*           type: string
*           format: date
*           description: The date of the appointment
*         startTime:
*           type: string
*           format: time
*           description: The start time of the appointment
*         endTime:
*           type: string
*           format: time
*           description: The end time of the appointment
*         room:
*           type: string
*           description: The room of the appointment
*         coWorking:
*           type: string
*           description: The co-working of the appointment
*         user:
*           type: string
*           description: The user of the appointment
*         status:
*           type: string
*           description: The status of the appointment
*         additional:
*           type: string
*           description: The additional of the appointment
*         priceId:
*           type: string
*         createdAt:
*           type: string
*           format: date
*           description: The date of the appointment
*       example:
*         date: 2024-04-23T17:00:00.000+00:00
*         startTime: 09:00
*         endTime: 10:00
*         room: 61f7b2b3d8a7b9e5f4d4e9b3
*         coWorking: 61f7b2b3d8a7b9e5f4d4e9b3
*         user : 61f7b2b3d8a7b9e5f4d4e9b3
*         additional: ""
*         priceId: "price_1JZ9ZvK9ZvKYlo2C5Q7Q7Q7Q"
*         status: unfinished
*         createdAt: 2024-04-24T12:01:23.124+00:00
*
* @swagger
* tags:
*   name: Appointments
*   description: The Appointments managing API
*
* @swagger
* /appointments:
*   get:
*     summary: Returns the list of all the appointments
*     tags: [Appointments]
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: The list of the appointments
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Appointment'
*       401:
*         description: Unauthorized user
*       500:
*         description: Server error
*
* @swagger
* /appointments/{id}:
*   get:
*     summary: Get the appointment by ID
*     tags: [Appointments]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The appointment ID
*     responses:
*       200:
*         description: The appointment description by ID
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Appointment'
*       401:
*         description: Unauthorized user
*       404:
*         description: The appointment was not found
*       500:
*         description: Server error
*
* @swagger
* /coworkings/{id}/appointments:
*   post:
*     summary: Create a new appointment
*     tags: [Appointments]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The co-working ID
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               date:
*                 type: string
*                 format: date
*               startTime:
*                 type: string
*                 format: time
*               endTime:
*                 type: string
*                 format: time
*               room:
*                 type: string
*               coWorking:
*                 type: string
*               user:
*                 type: string
*               additional:
*                 type: string
*             example:
*               date: 2024-04-23T17:00:00.000+00:00
*               startTime: 09:00
*               endTime: 10:00
*               room: 61f7b2b3d8a7b9e5f4d4e9b3
*               additional: ""
*     responses:
*       200:
*         description: The appointment was successfully created
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Appointment'
*       401:
*         description: Unauthorized user
*       500:
*         description: Server error
*
* @swagger
* /appointments/{id}:
*   put:
*     summary: Update the appointment by ID
*     tags: [Appointments]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The appointment ID
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               date:
*                 type: string
*                 format: date
*               startTime:
*                 type: string
*                 format: time
*               endTime:
*                 type: string
*                 format: time
*               additional:
*                 type: string
*             example:
*               date: 2024-04-23T17:00:00.000+00:00
*               startTime: 09:00
*               endTime: 10:00
*               additional: ""
*     responses:
*       200:
*         description: The appointment was successfully updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Appointment'
*       400:
*         description: The appointment has already been finished
*       401:
*         description: Unauthorized user
*       404:
*         description: The appointment was not found
*       500:
*         description: Server error
*
* @swagger
* /appointments/{id}:
*   delete:
*     summary: Delete the appointment by ID
*     tags: [Appointments]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The appointment ID
*     responses:
*       200:
*         description: The appointment was successfully deleted
*         content:
*           application/json:
*             schema:
*               type    : object
*               properties:
*                 success:
*                   type: boolean
*                 data:
*                   type: object
*       400:
*         description: The appointment has already been finished
*       401:
*         description: Unauthorized user
*       404:
*         description: The appointment was not found
*       500:
*         description: Server error
*
* @swagger
* /appointments/{id}/appointments:
*   get:
*     summary: Get the appointments by room ID
*     tags: [Appointments]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The room ID
*     responses:
*       200:
*         description: The appointments by room ID
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Appointment'
*       401:
*         description: Unauthorized user
*       404:
*         description: The appointment was not found
*       500:
*         description: Server error
*
*/

const express = require('express');
const {getAppointments, getAppointment, addAppointment, getRoom, deleteAppointment, updateAppointment} = require('../controllers/appointments');

const router = express.Router({mergeParams:true});

const {protect, authorize} = require('../middleware/auth');

router.route('/').get(protect, getAppointments).post(protect, authorize('admin','user'), addAppointment);
router.route('/:id').get(protect, getAppointment)
      .put(protect, authorize('admin','user'), updateAppointment)
      .delete(protect, authorize('admin','user'), deleteAppointment);

router.route('/:roomId/appointments').get(protect,authorize('admin','user'), getRoom);

module.exports=router;