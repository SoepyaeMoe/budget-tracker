import mongoose, { Schema } from "mongoose";

const SavingsSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
    },
    category: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Savings = mongoose.model("Savings", SavingsSchema);

export default Savings;
