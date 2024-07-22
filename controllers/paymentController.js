const Razorpay = require("razorpay");
const { RAZORPAY_ID_KEY, RAZORPAY_SECRET_KEY } = process.env;
const Reserve = require("../models/reserve");
const Payment = require("../models/payment");

const razorpayInstance = new Razorpay({
  key_id: RAZORPAY_ID_KEY,
  key_secret: RAZORPAY_SECRET_KEY,
});

module.exports.createOrder = async (req, res) => {
  try {
    const amount = req.body.total * 100;
    const reserveId = req.body.reserveId;
    const options = {
      amount: amount,
      currency: "INR",
      receipt: "wanderstay247@gmail.com",
    };

    razorpayInstance.orders.create(options, async (err, order) => {
      if (!err) {
        let availPay = await Payment.findOne({ reserveId: reserveId });
        let reserve = await Reserve.findById(reserveId);

        if (availPay == null) {
          const newPayment = new Payment({
            reserveId: reserveId,
            userId: req.body.userId,
            amount: amount,
          });

          let payId = await newPayment.save();

          reserve.payment = payId._id;
          reserve.save();
        }

        res.status(200).send({
          success: true,
          msg: "Payment Successfull",
          order_id: order.id,
          amount: amount,
          key_id: RAZORPAY_ID_KEY,
          title: "WanderStay",
          description: req.body.description,
          contact: req.body.mobile,
          name: req.body.userName,
          email: req.body.email,
        });

        // Check for payment ID periodically (e.g., using a setInterval or a background job)
        const checkPaymentId = setInterval(async () => {
          try {
            const payments = await razorpayInstance.orders.fetchPayments(
              order.id
            );
            if (payments.items && payments.items.length > 0) {
              const payment = payments.items[0];
              await Payment.updateOne(
                { reserveId: reserveId, userId: req.body.userId },
                {
                  orderId: order.id,
                  paymentId: payment.id,
                  status: payment.status,
                  method: payment.method,
                  createdAt: new Date(Date.now()),
                }
              );

              clearInterval(checkPaymentId); // Stop checking once payment is found
            }
          } catch (paymentErr) {
            console.log("Error fetching payment details:", paymentErr.message);
          }
        }, 5000); // Check every 5 seconds (adjust as needed)
      } else {
        res.status(400).send({ success: false, msg: "Something went wrong!" });
      }
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      success: false,
      msg: "Internal Server Error",
      error: error.message,
    });
  }
};
