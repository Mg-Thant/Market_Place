const Notification = require("../models/notification");

exports.pushNotification = async (req, res, next) => {
  const { title, comment, owner_id, product_id, phone_number } = req.body;
  try {
    await Notification.create({
      title,
      comment,
      owner_id,
      product_id,
      phone_number,
    });

    return res.status(200).json({
      isSuccess: true,
      message: "Notification Pushed!!!",
    });
  } catch (err) {
    return res.status(500).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

exports.getAllNoti = async (req, res, next) => {
  try {
    const notis = await Notification.find({ owner_id: req.userId }).sort({
      createdAt: -1,
    });

    if (notis.length === 0) {
      throw new Error("No notification not found!!!");
    }

    return res.status(200).json({
      isSuccess: true,
      notis,
    });
  } catch (err) {
    return res.status(500).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

exports.markAsRead = async (req, res, next) => {
  const { id } = req.params;
  try {
    const noti = await Notification.findById(id);

    if (!noti) {
      throw new Error("Notification not found!!!");
    }

    if (req.userId.toString() !== noti.owner_id.toString()) {
      throw new Error("Authorization Failed!!!");
    }

    noti.isRead = true;
    noti.save();

    return res.status(200).json({
      isSuccess: true,
      message: "Done",
    });
  } catch (err) {
    return res.status(500).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

exports.deleteNoti = async (req, res, next) => {
  const { id } = req.params;
  try {
    const noti = await Notification.findById(id);

    if (req.userId.toString() !== noti.owner_id.toString()) {
      throw new Error("Authorization Failed!!!");
    }

    await Notification.findByIdAndDelete(id);

    return res.status(200).json({
      isSuccess: true,
      message: "Deleted!!!",
    });
  } catch (err) {
    return res.status(500).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

exports.deleteAllNoti = async (req, res, next) => {
  try {
    await Notification.deleteMany({ owner_id: req.userId });

    return res.status(200).json({
      isSuccess: true,
      message: "Notifications are deleted!",
    });
  } catch (err) {
    return res.status(500).json({
      isSuccess: false,
      message: err.message,
    });
  }
};
