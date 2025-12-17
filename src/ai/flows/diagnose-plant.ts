'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const DiagnosePlantInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a plant, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  description: z.string().describe('The user\'s description of the plant\'s condition.'),
});

export type DiagnosePlantInput = z.infer<typeof DiagnosePlantInputSchema>;

const DiagnosePlantOutputSchema = z.object({
  isPlant: z.boolean().describe('Whether the image contains a plant.'),
  plantName: z.string().optional().describe('The common name of the plant.'),
  isHealthy: z.boolean().describe('Whether the plant appears to be healthy.'),
  diagnosis: z.string().optional().describe('The diagnosis of any disease or issue.'),
  careInstructions: z.string().optional().describe('Simple, actionable care instructions for the user.'),
});

export type DiagnosePlantOutput = z.infer<typeof DiagnosePlantOutputSchema>;

const diagnosePlantPrompt = ai.definePrompt({
  name: 'diagnosePlantPrompt',
  input: { schema: DiagnosePlantInputSchema },
  output: { schema: DiagnosePlantOutputSchema },
  prompt: `You are a friendly and helpful botanist AI. Analyze the user's photo and description to identify the plant and diagnose its health.

User's description: {{{description}}}
Photo: {{media url=photoDataUri}}

1. Determine if the image contains a plant. If not, set isPlant to false and ignore other fields.
2. If it is a plant, identify its common name.
3. Assess the plant's health. If it's unhealthy, provide a simple diagnosis and actionable care instructions.
4. Keep the language simple and encouraging for a non-expert audience.
`,
});

export async function diagnosePlant(input: DiagnosePlantInput): Promise<DiagnosePlantOutput> {
  const { output } = await diagnosePlantPrompt(input);
  if (!output) {
    throw new Error('The AI model did not return a response.');
  }
  return output;
}