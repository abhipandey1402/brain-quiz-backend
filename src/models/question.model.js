import mongoose, { Schema } from "mongoose";

const questionSchema = new Schema(
    {
        question: {
            type: String,
            required: true,
        },
        options: [
            {
                type: String,
            }
        ],
        answer: {
            type: String,
            required: true,
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
        attemptedBy: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        timestamps: true,
    }
)

export const Question = mongoose.model('Question', questionSchema);


