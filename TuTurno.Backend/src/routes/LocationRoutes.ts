import { Router } from "express";
import { LocationController } from "../controllers/LocationController";

const router = Router();
const locationController = new LocationController();

router.get("/getAllLocations", locationController.getAll);
router.get("/getActiveLocations", locationController.getActive);
router.get("/getInactiveLocations", locationController.getInactive);
router.get("/getLocationsByCity/:city", locationController.getByCity);
router.get("/getLocationsByCountry/:country", locationController.getByCountry);
router.get("/getLocationsByPhone/:phone", locationController.getByPhone);
router.get("/getLocationById/:id", locationController.getById);
router.post("/createLocation", locationController.create);
router.put("/updateLocation/:id", locationController.update);
router.delete("/deleteLocation/:id", locationController.delete);

export default router;
