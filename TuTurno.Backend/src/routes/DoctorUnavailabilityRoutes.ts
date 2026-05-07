import { Router } from "express";
import { DoctorUnavailabilityController } from "../controllers/DoctorUnavailabilityController";

const router = Router();
const controller = new DoctorUnavailabilityController();

router.get("/doctor/:doctorId", controller.getByDoctorId);
router.post("/", controller.create);
router.post("/bulk", controller.createBulk);
router.delete("/:id", controller.delete);

export default router;
