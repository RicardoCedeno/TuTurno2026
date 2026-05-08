import { Router } from 'express';
import { SpecialtyAIController } from '../../controllers/AIControllers/specialtyAIController';

const specialtyAIRoutes = Router();
const specialtyAIController = new SpecialtyAIController();

/**
 * @route POST /api/ai/specialties/generate-description
 * @desc Genera una descripción para una especialidad
 */
specialtyAIRoutes.post('/generate-specialty-description', specialtyAIController.generateSpecialtyDescription);

export default specialtyAIRoutes;
