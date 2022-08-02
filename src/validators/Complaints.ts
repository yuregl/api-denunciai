import { body, param } from "express-validator";

const createComplaints = [
  body("userId").isString().notEmpty().withMessage("the field was not filled").isLength({min: 36, max: 36}),
  body("title").isString().notEmpty().withMessage("the field was not filled"),
  body("description").isString().notEmpty().withMessage("the field was not filled"),
  body("address").isString().notEmpty().withMessage("the field was not filled")
];

const getComplaintsByComplaintId = [
  param("complaint_id").notEmpty().isLength({min: 36, max: 36}).withMessage("invalid parameter")
];

const updateComplaint = [
  param("complaint_id").notEmpty().isLength({min: 36, max: 36}).withMessage("invalid parameter"),
  body("title").isString().optional(),
  body("description").isString().optional(),
  body("address").isString().optional()
];

const getAllComplaint = [
  param("user_id").notEmpty().isLength({min: 36, max: 36}).withMessage("invalid parameter"),
];

const deleteComplaint = [
  param("user_id").notEmpty().isLength({min: 36, max: 36}).withMessage("invalid parameter"),
  param("complaint_id").notEmpty().isLength({min: 36, max: 36}).withMessage("invalid parameter"),
];

export {
  createComplaints,
  getComplaintsByComplaintId,
  updateComplaint,
  getAllComplaint,
  deleteComplaint
}