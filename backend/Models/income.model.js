import mongoose from "mongoose";

const incomeSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
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

const Income = mongoose.model("Income", incomeSchema);

export default Income;