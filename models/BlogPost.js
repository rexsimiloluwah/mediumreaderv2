import mongoose from 'mongoose';
import langauges from '../utils/JSON/langs.json';

/* Schema for Blog post */
const blogPostSchema = new mongoose.Schema({
    blogUrl : {
        type: String,
        trim: true,
        required: true
    },

    audioFileUrl : {
        type: String,
        trim: true,
        required: true
    },

    language : {
        type: String,
        trim: true,
        enum: langauges.map(item => (item.slug))
    },

    wordCount : {
        type: Number,
        default: null
    }
},
{
    timestamps: true
}
)

export default mongoose.model('BlogPost', blogPostSchema);