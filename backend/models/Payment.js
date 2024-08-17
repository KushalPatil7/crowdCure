const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  solutionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Solution', required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  paymentMethod: { type: String, required: true },
});

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;