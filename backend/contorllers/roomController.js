const RoomModel = require("../models/RoomModel");
const jwt = require("jsonwebtoken");

exports.listRoom = async (req, res, next) => {
  try {
    const rooms = await RoomModel.find({});
    
    res.status(200).json({ data: rooms });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.joinRoom = async (req, res, next) => {
  try {
    const room = await RoomModel.findByIdAndUpdate(req.params.room_id, req.body);
    console.log(room)
    res.status(200).json({ data: room });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.createRoom = async (req, res, next) => {
  const { room_name, players } = req.body;
  console.log( room_name, players)
  const room = new RoomModel({
    name: room_name,
    players: players,
  });
  const result = await room.save();
  res.status(200).json({
    message: "room created",
    id : room._id,
    room: room,
  });
};