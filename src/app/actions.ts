'use server';

import { 
  getStudentFinancialPlan,
  type StudentFinancialPlannerInput,
  type StudentFinancialPlannerOutput
} from '@/ai/flows/student-financial-planner';

export async function getFinancialPlan(
  input: StudentFinancialPlannerInput
): Promise<{ data: StudentFinancialPlannerOutput | null; error: string | null }> {
  try {
    const output = await getStudentFinancialPlan(input);
    if (!output) {
      return { data: null, error: 'Failed to get a financial plan. The AI returned no output.' };
    }
    return { data: output, error: null };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
    return { data: null, error: `An error occurred: ${errorMessage}` };
  }
}
