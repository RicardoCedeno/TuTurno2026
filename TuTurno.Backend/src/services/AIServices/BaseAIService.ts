import OpenAI from 'openai';

export class BaseAIService {
  private openai: OpenAI;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is not defined in environment variables');
    }
    this.openai = new OpenAI({
      apiKey: apiKey
    });
  }

  protected async generateText(prompt: string): Promise<string> {
    try {
      const response = await this.openai.responses.create({
        model: 'gpt-4.1-nano',
        instructions: prompt,
        max_output_tokens: 30,
        input: prompt
      });
      return response.output_text || '';
    } catch (error) {
      console.error('Error in BaseAIService.generateText:', error);
      throw new Error('Failed to generate text from AI');
    }
  }
}
