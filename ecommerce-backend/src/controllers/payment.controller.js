const paymentService = require("../services/payment.service");

const createPaymentLink = async (req, res) => {
  try {
    const paymentLink = await paymentService.createPaymentLink(Number(req.params.id));
    return res.status(200).send(paymentLink);
  } catch (error) {
    console.error('Error creating payment link:', error);
    return res.status(500).send({ error: error.message });
  }
};

const updatePaymentInformation = async (req, res) => {
    const userId = req.user.id;
  try {
    await paymentService.updatePaymentInformation(req.query,userId);
    return res.status(200).send({ message: "Payment information updated", status: true });
  } catch (error) {
    console.error('Error updating payment information:', error);
    return res.status(500).send({ error: error.message });
  }
};

module.exports = { createPaymentLink, updatePaymentInformation };
