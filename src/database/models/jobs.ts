import mongoose, { Schema } from 'mongoose';
interface JobInterface { job_title: string; job_description: string; attachments: string[]; }

const JobSchema = new Schema<JobInterface>(
  {
    job_title: { type: String, required: true },
    job_description: { type: String, required: true },
    attachments: { type: [String], required: false, default: []}
  },
  { timestamps: true }
);

const JobModel = mongoose.models.Job as mongoose.Model<JobInterface> || mongoose.model<JobInterface>('Job', JobSchema);

export default JobModel;
