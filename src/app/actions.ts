'use server';

import { 
  getPersonalizedInsuranceRecommendations,
  type PersonalizedInsuranceRecommendationsInput,
  type PersonalizedInsuranceRecommendationsOutput
} from '@/ai/flows/personalized-insurance-recommendations';

export async function getRecommendations(
  input: PersonalizedInsuranceRecommendationsInput
): Promise<{ data: PersonalizedInsuranceRecommendationsOutput | null; error: string | null }> {
  try {
    const output = await getPersonalizedInsuranceRecommendations(input);
    if (!output) {
      return { data: null, error: 'Failed to get recommendations. The AI returned no output.' };
    }
    return { data: output, error: null };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
    return { data: null, error: `An error occurred: ${errorMessage}` };
  }
}
