import { Request, Response } from 'express';
import { SpecialtyAIService } from '../../services/AIServices/SpecialtyAIService';
import { ResponseDto } from '../../models/dtos/responseDto';

export class SpecialtyAIController {
  private specialtyAIService: SpecialtyAIService;

  constructor() {
    this.specialtyAIService = new SpecialtyAIService();
  }

  generateSpecialtyDescription = async (req: Request, res: Response): Promise<void> => {
    const response: ResponseDto<string> = {
      success: true,
      errors: [],
      data: ''
    };

    try {
      const { name } = req.body;

      if (!name || typeof name !== 'string') {
        response.success = false;
        response.errors.push('El nombre de la especialidad es obligatorio y debe ser un texto.');
        res.status(400).json(response);
        return;
      }

      const description = await this.specialtyAIService.suggestDescription(name);
      response.data = description;
      res.status(200).json(response);
    } catch (error) {
      console.error('Error in SpecialtyAIController.generateSpecialtyDescription:', error);
      response.success = false;
      response.errors.push('Error al generar la descripción mediante IA.');
      res.status(500).json(response);
    }
  };
}
