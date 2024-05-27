
// positionsRoutes.js
import express from "express";
import positionsController from "../controllers/positionsController.js";

const router = express.Router();

router.post("/positions/register", positionsController.registerPositions);
router.put("/positions/update/:id", positionsController.updatePositions);
router.delete("/positions/delete/:id", positionsController.deletePositions);
router.get("/positions/all", positionsController.getAllPositionss);
router.get("/positions/:id", positionsController.getSinglePositions);

export default router;

