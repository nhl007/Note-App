import mongoose from 'mongoose';

interface INotes {
  title: string;
  content: Text;
  createdAt: Date;
  createdBy: {
    userId: string;
  };
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
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Note = mongoose.model<INotes>('Notes', notesSchema);

export default Note;
