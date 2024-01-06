import mongoose, { Schema } from "mongoose";

const testSchema = new Schema(
    {
        attemptedBy: {
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
        score: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ["NOT_STARTED", "STARTED", "COMPLETED"],
            required: true,
        },
        attemptedQuestions: [
            {
                questionId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Question',
                    required: true
                },
                question: {
                    type: String,
                    required: true
                },
                options: [
                    {
                        type: String,
                        required: true
                    }
                ],
                correctAnswer: {
                    type: String,
                    required: true
                },
                selectedOption: {
                    type: String,
                    required: true
                },
                isCorrect: {
                    type: Boolean,
                    required: true
                },
            }
        ]
    },
    {
        timestamps: true
    }
)

export const Test = mongoose.model('Test', testSchema);

