'use server';

/**
 * @fileOverview A personalized loan recommendation AI agent.
 *
 * - getPersonalizedLoanRecommendations - A function that provides personalized loan recommendations.
 * - PersonalizedLoanRecommendationsInput - The input type for the getPersonalizedLoanRecommendations function.
 * - PersonalizedLoanRecommendationsOutput - The return type for the getPersonalizedLoanRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedLoanRecommendationsInputSchema = z.object({
  income: z.number().describe('Monthly income of the user.'),
  creditScore: z.number().describe('Credit score of the user.'),
  loanPurpose: z.string().describe('The purpose of the loan.'),
  loanAmount: z.number().describe('The desired loan amount.'),
});
export type PersonalizedLoanRecommendationsInput = z.infer<
  typeof PersonalizedLoanRecommendationsInputSchema
>;

const PersonalizedLoanRecommendationsOutputSchema = z.object({
  recommendations: z.array(
    z.object({
      provider: z.string().describe('Name of the microfinance provider.'),
      loanProduct: z.string().describe('Name of the loan product.'),
      interestRate: z.number().describe('Interest rate of the loan product.'),
      maxTerm: z.string().describe('Maximum term length of the loan.'),
      processingFee: z.string().describe('Processing fee for the loan.'),
      suitabilityScore: z
        .number()
        .describe('A score indicating how suitable the loan is for the user.'),
      reasoning: z
        .string()
        .describe('Explanation of why this loan is a good fit for the user.'),
    })
  ),
  overallAdvice: z
    .string()
    .describe('Overall financial advice based on the user situation.'),
});
export type PersonalizedLoanRecommendationsOutput = z.infer<
  typeof PersonalizedLoanRecommendationsOutputSchema
>;

export async function getPersonalizedLoanRecommendations(
  input: PersonalizedLoanRecommendationsInput
): Promise<PersonalizedLoanRecommendationsOutput> {
  return personalizedLoanRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedLoanRecommendationsPrompt',
  input: {schema: PersonalizedLoanRecommendationsInputSchema},
  output: {schema: PersonalizedLoanRecommendationsOutputSchema},
  prompt: `You are a financial advisor specializing in microfinance. A user will provide their financial situation, and you will recommend suitable loan products. You must follow the following instructions:

1.  Analyze the user's financial situation based on their income, credit score, loan purpose and loan amount.
2.  Compare different microfinance providers based on the following critical information: interest rates, maximum term length and processing fees.
3.  Provide a suitability score for each loan option.
4.  Explain why each loan option is a good fit for the user based on their unique circumstances.
5.  Provide overall financial advice to the user.

User's Financial Situation:
Income: {{income}}
Credit Score: {{creditScore}}
Loan Purpose: {{loanPurpose}}
Loan Amount: {{loanAmount}}

Available Microfinance Providers:
Provider A: Loan Product: MicroStart, Interest Rate: 4.5%, Max Term: 12 Months, Processing Fee: $10
Provider B: Loan Product: QuickLoan, Interest Rate: 5.2%, Max Term: 24 Months, Processing Fee: Free
Provider C: Loan Product: ExpressCredit, Interest Rate: 6.0%, Max Term: 18 Months, Processing Fee: $5

Response:`,
});

const personalizedLoanRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedLoanRecommendationsFlow',
    inputSchema: PersonalizedLoanRecommendationsInputSchema,
    outputSchema: PersonalizedLoanRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
