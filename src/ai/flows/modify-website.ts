// src/ai/flows/modify-website.ts
'use server';
/**
 * @fileOverview A flow that modifies an existing website based on a follow-up prompt.
 *
 * - modifyWebsite - A function that handles the website modification process.
 * - ModifyWebsiteInput - The input type for the modifyWebsite function.
 * - ModifyWebsiteOutput - The return type for the modifyWebsite function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ModifyWebsiteInputSchema = z.object({
  baseCode: z.string().describe('The existing code of the website to modify.'),
  prompt: z.string().describe('The follow-up prompt to use for modifying the website.'),
});
export type ModifyWebsiteInput = z.infer<typeof ModifyWebsiteInputSchema>;

const ModifyWebsiteOutputSchema = z.object({
  modifiedCode: z.string().describe('The modified code of the website.'),
  instructions: z.string().describe('Instructions and status updates related to the code modification.'),
});
export type ModifyWebsiteOutput = z.infer<typeof ModifyWebsiteOutputSchema>;

export async function modifyWebsite(input: ModifyWebsiteInput): Promise<ModifyWebsiteOutput> {
  return modifyWebsiteFlow(input);
}

const modifyWebsitePrompt = ai.definePrompt({
  name: 'modifyWebsitePrompt',
  input: {schema: ModifyWebsiteInputSchema},
  output: {schema: ModifyWebsiteOutputSchema},
  prompt: `You are an expert web developer who takes an existing codebase and modifies it based on a user's instructions.

  Here is the existing codebase:
  \`\`\`
  {{{baseCode}}}
  \`\`\`

  Here are the instructions for modifying the codebase:
  {{{prompt}}}

  Based on these instructions, modify the existing codebase.

  Return the complete modified code, and also provide instructions and status updates related to the code modification process.

  Ensure that the modified code is functional and adheres to best practices.
  `, 
});

const modifyWebsiteFlow = ai.defineFlow(
  {
    name: 'modifyWebsiteFlow',
    inputSchema: ModifyWebsiteInputSchema,
    outputSchema: ModifyWebsiteOutputSchema,
  },
  async input => {
    const {output} = await modifyWebsitePrompt(input);
    return output!;
  }
);
