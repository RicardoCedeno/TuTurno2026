import { BaseAIService } from './BaseAIService';

export class SpecialtyAIService extends BaseAIService {
  constructor() {
    super();
  }

  async suggestDescription(specialtyName: string): Promise<string> {
    const prompt = `
Describe en 10 palabras o menos la especialidad médica "${specialtyName}".
`;

    return await this.generateText(prompt);
  }
}
