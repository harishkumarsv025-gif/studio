'use server';

import { 
  getPersonalizedLoanRecommendations,
  type PersonalizedLoanRecommendationsInput,
  type PersonalizedLoanRecommendationsOutput
} from '@/ai/flows/personalized-loan-recommendations';

export async function getRecommendations(
  input: PersonalizedLoanRecommendationsInput
): Promise<{ data: PersonalizedLoanRecommendationsOutput | null; error: string | null }> {
  try {
    const output = await getPersonalizedLoanRecommendations(input);
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
