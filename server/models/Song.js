import mongoose from "mongoose";

const SongSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true
    },
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    favorite: Boolean,
    imageUrl : String,
}, {
    timestamps: true,
},
)

export default mongoose.model('Song', SongSchema);