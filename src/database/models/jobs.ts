import mongoose, { Schema } from 'mongoose';
interface JobInterface { job_title: string; job_description: string; attachments: string[]; positions_left: number; interviewed: number; applications: number; rejections: number; pending_feedback: number; offers: number; }

const JobSchema = new Schema<JobInterface>(
  {
  job_title:         { type: String },
  job_description:   { type: String },
  positions_left:    { type: Number },
  interviewed:       { type: Number, default: 0 },
  applications:      { type: Number, default: 0 },
  rejections:        { type: Number, default: 0 },
  pending_feedback:  { type: Number, default: 0 },
  offers:            { type: Number, default: 0 },
  attachments:       { type: [String], default: [] },
},
  { timestamps: true }
);

const JobModel = mongoose.models.Job as mongoose.Model<JobInterface> || mongoose.model<JobInterface>('Job', JobSchema);

export default JobModel;
