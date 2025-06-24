import mongoose, { Schema } from 'mongoose';
interface CandidateInterface { profile_picture: string; firstname: string; lastname: string; email: string; phone: string; }

const CandidateSchema = new Schema<CandidateInterface>(
  {
    profile_picture: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: {  type: String, required: true },
    phone: {  type: String, required: true },
  },
  { timestamps: true }
);

const CandidateModel = mongoose.models.Candidate as mongoose.Model<CandidateInterface> || mongoose.model<CandidateInterface>('Candidate', CandidateSchema);

export default CandidateModel;
