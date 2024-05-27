// staffRoutes.js
import express from "express";
import staffController from "../controllers/staffController.js";

const router = express.Router();

router.post("/staff/register", staffController.registerStaff);
router.put("/staff/update/:id", staffController.updateStaff);
router.delete("/staff/delete/:id", staffController.deleteStaff);
router.get("/staff/all", staffController.getAllStaff);
router.get("/staff/:id", staffController.getSingleStaff);




export default router;
