const Booking = require('../../models/booking.model');

// 1. CREATE BOOKING: Reserve a ground for a match or practice
exports.createBooking = async (req, res) => {
  try {
    const { ground_id, match_id, booking_date, time_slot, total_amount } = req.body;

    // Implementation of the Elite XOR Logic
    if (!match_id && !req.user.id) {
      return res.status(400).json({ success: false, message: "Booking must have a User or a Match" });
    }

    const newBooking = await Booking.create({
      user_id: match_id ? null : req.user.id,
      match_id: match_id || null,
      ground_id,
      booking_date,
      time_slot,
      total_amount,
      payment_status: 'PENDING'
    });

    res.status(201).json({
      success: true,
      data: newBooking,
      meta: { message: "Booking initialized. Awaiting payment." }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: { message: "Booking failed" } });
  }
};