import { Router } from "express";
import { DoctorAvailabilityController } from "../controllers/DoctorAvailabilityController";

const router = Router();
const controller = new DoctorAvailabilityController();

router.get("/doctor/:doctorId", controller.getByDoctorId);
router.post("/", controller.create);
router.post("/bulk", controller.createBulk);
router.delete("/:id", controller.delete);

export default router;
