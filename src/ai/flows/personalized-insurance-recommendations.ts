'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const PersonalizedInsuranceRecommendationsInputSchema = z.object({
    householdSize: z.number().describe('The number of people in the household.'),
    monthlyIncome: z.number().describe('The total monthly income of the household in INR.'),
    assetsValue: z.number().describe('The approximate value of assets to be insured (e.g., home, vehicle) in INR.'),
    coverageType: z.string().describe('The primary type of coverage the user is interested in (e.g., Health, Property, Crop).'),
});
export type PersonalizedInsuranceRecommendationsInput = z.infer<typeof PersonalizedInsuranceRecommendationsInputSchema>;


const RecommendationSchema = z.object({
    policyName: z.string().describe('A suitable, catchy name for the recommended insurance policy, e.g., "HealthGuard Basic" or "CropSure Starter".'),
    provider: z.string().describe('The name of the insurance provider, e.g., "Community Insure", "AgriProtect".'),
    monthlyPremium: z.number().describe('The estimated monthly premium for the policy in INR.'),
    deductible: z.string().describe('The deductible for the policy, formatted as a currency string (e.g., "₹500") or a percentage (e.g., "10% of loss").'),
    coverageDetails: z.string().describe('A brief, clear summary of what the policy covers.'),
    suitabilityScore: z.number().min(1).max(10).describe('A score from 1 to 10 indicating how suitable this policy is for the user, with 10 being most suitable.'),
    reasoning: z.string().describe('A short, encouraging sentence explaining why this policy is a good fit for the user\'s situation.'),
});

const PersonalizedInsuranceRecommendationsOutputSchema = z.object({
    recommendations: z.array(RecommendationSchema).length(3).describe('A list of exactly three personalized micro-insurance policy recommendations.'),
    overallAdvice: z.string().describe('A concluding paragraph of general, encouraging financial advice for the user regarding insurance and savings, tailored to their low-income context.'),
});
export type PersonalizedInsuranceRecommendationsOutput = z.infer<typeof PersonalizedInsuranceRecommendationsOutputSchema>;


const insurancePrompt = ai.definePrompt({
    name: 'insuranceRecommender',
    input: { schema: PersonalizedInsuranceRecommendationsInputSchema },
    output: { schema: PersonalizedInsuranceRecommendationsOutputSchema },

    prompt: `You are an empathetic and helpful AI financial advisor specializing in micro-insurance for low-income households in India.
Your goal is to provide accessible, affordable, and easy-to-understand insurance recommendations.

Generate 3 distinct policy recommendations based on the user's profile. The user has a household size of {{{householdSize}}}, a monthly income of ₹{{{monthlyIncome}}}, and assets valued at ₹{{{assetsValue}}}. They are primarily interested in {{{coverageType}}} insurance.

The recommendations should be:
1.  **Affordable:** Monthly premiums must be a very small fraction of the user's monthly income.
2.  **Relevant:** Tailored to the user's stated coverage interest and financial situation.
3.  **Clear:** Use simple language. Avoid jargon.

For each policy, invent a provider and a policy name. Create realistic premium and deductible figures that are appropriate for a low-income context in India (in INR).

Finally, provide a short paragraph of overall friendly and encouraging advice about the importance of insurance for financial stability, keeping their specific situation in mind.
`,
});

export async function getPersonalizedInsuranceRecommendations(input: PersonalizedInsuranceRecommendationsInput): Promise<PersonalizedInsuranceRecommendationsOutput> {
    const { output } = await insurancePrompt(input);
    if (!output) {
        throw new Error("The AI model did not return any recommendations.");
    }
    return output;
}
