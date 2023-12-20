import mongoose, { Schema } from "mongoose";

const testSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        topic: {
            type: String,
            required: true,
            trim: true,
        },
        difficulty: {
            type: String,
            required: true,
            trim: true,
        },
        numberOfQue: {
            type: Number,
            required: true,
        },
        correctAns: {
            type: Number,
            required: true,
        },
        inCorrectAns: {
            type: Number,
            required: true,
        },
        testTotalDuration: {
            type: Number,
            required: true,
        },
        testSubmisionDuration: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ["NOT_STARTED", "STARTED", "COMPLETED"],
            required: true,
        }
    },
    {
        timestamps: true
    }
)

export const Test = mongoose.model('Test', testSchema);

