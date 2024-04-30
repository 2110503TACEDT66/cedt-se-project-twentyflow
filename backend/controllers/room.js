const Room = require('../models/Room');
const coworking = require('../models/CoWorking');

//@desc      Get all rooms
//@route     GET /api/v1/rooms
//@access    Private
exports.getRooms = async (req, res, next) => {
    let query;

    //General users can see only their rooms!
    query = await Room.find().sort({ roomNumber: 1 });
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

//@desc      Get single room
//@route     GET /api/v1/rooms/:id
//@access    Private
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

//@desc      Add room
//@route     POST /api/v1/rooms
//@access    Private
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