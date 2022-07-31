import { Status } from "../models/Complaints";

export interface IUpdateComplaints {
  title: string;
  description: string;
  address: string;
  updated_at?: Date
}

export interface ICreateComplaints {
  userId: string,
  title: string,
  description: string,
  address: string
  id: string,
  status: Status;
}