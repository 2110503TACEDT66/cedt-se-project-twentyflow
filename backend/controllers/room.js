const Room = require('../models/Room');
const coworking = require('../models/CoWorking');

exports.getRooms = async (req, res, next) => {
    let query;

    //General users can see only their rooms!
    if (req.user.role !== 'admin') {
        query = await Room.find({ coWorking: req.params.coWorkingId }).sort({ roomNumber: 1 });
    } else {
        //If you are an admin, you can see all!
        query = await Room.find({ coWorking: req.params.coWorkingId }).sort({ roomNumber: 1 });
    }
    try {
        const rooms = query;
        res.status(200).json({
            success: true,
            count: rooms.length,
            data: rooms
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Cannot find Room" });
    }
}

exports.getRoom = async (req, res, next) => {
    try {
        const room = await Room.findById(req.params.id);
        res.status(200).json({
            success: true,
            data: room
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Cannot find Room" });
    }
}

exports.addRoom = async (req, res, next) => {
    try {
        const room = await Room.create(req.body);
        const coWorking = await coworking.findById(req.params.coWorkingId);
        coWorking.rooms.push(room);
        await coWorking.save();
        res.status(200).json({
            success: true,
            data: room
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Cannot add Room" });
    }
}