import mongoose from 'mongoose';

interface INotes {
  title: string;
  content: Text;
  createdAt: Date;
  userId: typeof mongoose.Schema.ObjectId;
}

const notesSchema = new mongoose.Schema<INotes>({
  title: {
    type: String,
    required: [true, 'Please enter a title'],
  },
  content: {
    type: String,
    required: [true, 'Please enter the content'],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Your are not authorized'],
  },
});

const Note = mongoose.model<INotes>('Notes', notesSchema);

export default Note;
