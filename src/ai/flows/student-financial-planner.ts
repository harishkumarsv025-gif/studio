'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const StudentFinancialPlannerInputSchema = z.object({
    monthlyIncome: z.number().describe('The student\'s total monthly income (from part-time jobs, allowances, etc.).'),
    monthlyExpenses: z.number().describe('The student\'s total monthly essential expenses (rent, utilities, food).'),
    savingsGoal: z.string().describe('A specific savings goal the student has (e.g., "new laptop", "study abroad trip", "emergency fund").'),
    timeframe: z.string().describe('The timeframe in which the student wants to achieve their goal (e.g., "6 months").'),
});
export type StudentFinancialPlannerInput = z.infer<typeof StudentFinancialPlannerInputSchema>;

const AdviceSchema = z.object({
    category: z.string().describe('The category of the advice, e.g., "Budgeting Tip", "Savings Strategy", "Income Idea".'),
    advice: z.string().describe('A single, actionable piece of advice.'),
});

const StudentFinancialPlannerOutputSchema = z.object({
    monthlySavingsTarget: z.number().describe('The suggested amount the student should aim to save each month to reach their goal.'),
    progressSummary: z.string().describe('A brief, encouraging summary of how achievable the goal is with the suggested savings plan.'),
    actionableAdvice: z.array(AdviceSchema).length(3).describe('A list of exactly three diverse, actionable financial tips tailored to the student\'s situation.'),
});
export type StudentFinancialPlannerOutput = z.infer<typeof StudentFinancialPlannerOutputSchema>;

const plannerPrompt = ai.definePrompt({
    name: 'studentFinancePlanner',
    input: { schema: StudentFinancialPlannerInputSchema },
    output: { schema: StudentFinancialPlannerOutputSchema },

    prompt: `You are a friendly, savvy AI financial advisor for university students. Your goal is to provide simple, actionable, and encouraging financial advice.

A student has the following financial profile:
- Monthly Income: {{{monthlyIncome}}}
- Monthly Essential Expenses: {{{monthlyExpenses}}}
- Savings Goal: {{{savingsGoal}}}
- Goal Timeframe: {{{timeframe}}}

Based on this, provide a personalized financial plan.
1.  Calculate a realistic monthly savings target to help them reach their goal within the timeframe.
2.  Write a short, encouraging summary about their progress towards the goal.
3.  Provide three distinct, actionable tips. The tips should be diverse—covering budgeting, saving, or even ways to earn a little extra money relevant to a student lifestyle. Keep the tone light, positive, and non-judgmental.
`,
});

export async function getStudentFinancialPlan(input: StudentFinancialPlannerInput): Promise<StudentFinancialPlannerOutput> {
    const { output } = await plannerPrompt(input);
    if (!output) {
        throw new Error("The AI model did not return any recommendations.");
    }
    return output;
}
