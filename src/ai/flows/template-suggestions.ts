'use server';

/**
 * @fileOverview Template suggestion flow.
 *
 * - suggestTemplates - A function that suggests website templates based on a prompt.
 * - SuggestTemplatesInput - The input type for the suggestTemplates function.
 * - SuggestTemplatesOutput - The return type for the suggestTemplates function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestTemplatesInputSchema = z.object({
  prompt: z.string().describe('The user-provided prompt for generating a website.'),
});
export type SuggestTemplatesInput = z.infer<typeof SuggestTemplatesInputSchema>;

const SuggestTemplatesOutputSchema = z.object({
  templates: z.array(
    z.object({
      name: z.string().describe('The name of the suggested template.'),
      description: z.string().describe('A brief description of the template.'),
      imageUrl: z.string().describe('URL of an image representing the template.'),
    })
  ).describe('An array of suggested website templates.'),
});
export type SuggestTemplatesOutput = z.infer<typeof SuggestTemplatesOutputSchema>;

export async function suggestTemplates(input: SuggestTemplatesInput): Promise<SuggestTemplatesOutput> {
  return suggestTemplatesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestTemplatesPrompt',
  input: {schema: SuggestTemplatesInputSchema},
  output: {schema: SuggestTemplatesOutputSchema},
  prompt: `Based on the user's prompt: "{{prompt}}", suggest three website templates that would be a good starting point.

Each template should have a name, a brief description, and an imageUrl.

Ensure that the output is a JSON array of templates matching the following schema:

${JSON.stringify(SuggestTemplatesOutputSchema.shape, null, 2)}`,
});

const suggestTemplatesFlow = ai.defineFlow(
  {
    name: 'suggestTemplatesFlow',
    inputSchema: SuggestTemplatesInputSchema,
    outputSchema: SuggestTemplatesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
