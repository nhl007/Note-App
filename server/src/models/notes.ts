import mongoose from 'mongoose';

interface INotes {
  title: string;
  content: Text;
  createdAt: Date;
  images: {
    assetId: string;
    url: string;
  }[];
  privacy: 'public' | 'private';
  userId: typeof mongoose.Schema.ObjectId;
}

const notesSchema = new mongoose.Schema<INotes>({
  title: {
    type: String,
    maxlength: [100, 'Title can not exceed 100 characters!'],
    required: [true, 'Please enter a title'],
  },
  content: {
    type: String,
    required: [true, 'Please enter the content'],
  },
  images: [
    {
      assetId: {
        type: String,
        required: true,
      },

      url: {
        type: String,
        require: [true, 'No url provided'],
      },
    },
  ],
  privacy: {
    type: String,
    default: 'private',
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Your are not authorized'],
    select: false,
  },
});

const Note = mongoose.model<INotes>('Notes', notesSchema);

export default Note;
