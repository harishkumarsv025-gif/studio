'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const PersonalizedLoanRecommendationsInputSchema = z.object({
    householdSize: z.number().describe('The number of people in the household.'),
    monthlyIncome: z.number().describe('The total monthly income of the household in INR.'),
    loanAmount: z.number().describe('The desired loan amount in INR.'),
    loanPurpose: z.string().describe('The primary purpose for the loan (e.g., Business, Education, Emergency).'),
});
export type PersonalizedLoanRecommendationsInput = z.infer<typeof PersonalizedLoanRecommendationsInputSchema>;


const RecommendationSchema = z.object({
    productName: z.string().describe('A suitable, catchy name for the recommended loan product, e.g., "BusinessBooster Loan" or "EduGrowth Advance".'),
    provider: z.string().describe('The name of the lending institution, e.g., "Community Bank", "FinGrowth Lenders".'),
    interestRate: z.string().describe('The estimated annual interest rate for the loan, formatted as a percentage (e.g., "12.5%").'),
    tenure: z.string().describe('The loan tenure or repayment period (e.g., "24 months").'),
    loanDetails: z.string().describe('A brief, clear summary of what the loan offers and its key features.'),
    suitabilityScore: z.number().min(1).max(10).describe('A score from 1 to 10 indicating how suitable this loan is for the user, with 10 being most suitable.'),
    reasoning: z.string().describe('A short, encouraging sentence explaining why this loan is a good fit for the user\'s situation.'),
});

const PersonalizedLoanRecommendationsOutputSchema = z.object({
    recommendations: z.array(RecommendationSchema).length(3).describe('A list of exactly three personalized micro-loan product recommendations.'),
    overallAdvice: z.string().describe('A concluding paragraph of general, encouraging financial advice for the user regarding borrowing and financial planning, tailored to their low-income context.'),
});
export type PersonalizedLoanRecommendationsOutput = z.infer<typeof PersonalizedLoanRecommendationsOutputSchema>;


const loanPrompt = ai.definePrompt({
    name: 'loanRecommender',
    input: { schema: PersonalizedLoanRecommendationsInputSchema },
    output: { schema: PersonalizedLoanRecommendationsOutputSchema },

    prompt: `You are an empathetic and helpful AI financial advisor specializing in micro-credit for low-income households in India.
Your goal is to provide accessible, affordable, and easy-to-understand loan recommendations.

Generate 3 distinct loan recommendations based on the user's profile. The user has a household size of {{{householdSize}}}, a monthly income of ₹{{{monthlyIncome}}}, and needs a loan of ₹{{{loanAmount}}} for {{{loanPurpose}}}.

The recommendations should be:
1.  **Affordable:** Interest rates must be reasonable for the user's income level.
2.  **Relevant:** Tailored to the user's stated loan purpose and financial situation.
3.  **Clear:** Use simple language. Avoid jargon.

For each product, invent a provider and a product name. Create realistic interest rate and tenure figures that are appropriate for a low-income context in India.

Finally, provide a short paragraph of overall friendly and encouraging advice about responsible borrowing and financial planning, keeping their specific situation in mind.
`,
});

export async function getPersonalizedLoanRecommendations(input: PersonalizedLoanRecommendationsInput): Promise<PersonalizedLoanRecommendationsOutput> {
    const { output } = await loanPrompt(input);
    if (!output) {
        throw new Error("The AI model did not return any recommendations.");
    }
    return output;
}
