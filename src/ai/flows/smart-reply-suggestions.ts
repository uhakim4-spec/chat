'use server';

/**
 * @fileOverview Provides smart reply suggestions based on the context of the current message.
 *
 * - getSmartReplySuggestions - A function that generates smart reply suggestions.
 * - SmartReplySuggestionsInput - The input type for the getSmartReplySuggestions function.
 * - SmartReplySuggestionsOutput - The return type for the getSmartReplySuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartReplySuggestionsInputSchema = z.object({
  message: z.string().describe('The current message to generate suggestions for.'),
});
export type SmartReplySuggestionsInput = z.infer<typeof SmartReplySuggestionsInputSchema>;

const SmartReplySuggestionsOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe('An array of suggested replies based on the input message.'),
});
export type SmartReplySuggestionsOutput = z.infer<typeof SmartReplySuggestionsOutputSchema>;

export async function getSmartReplySuggestions(
  input: SmartReplySuggestionsInput
): Promise<SmartReplySuggestionsOutput> {
  return smartReplySuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartReplySuggestionsPrompt',
  input: {schema: SmartReplySuggestionsInputSchema},
  output: {schema: SmartReplySuggestionsOutputSchema},
  prompt: `You are a helpful assistant that suggests replies to a given message.

  Message: {{{message}}}

  Provide 3 different reply suggestions that would be appropriate in response to the message.
  Format each suggestion as a string in a JSON array.
  Do not include any additional text or explanation.`,
});

const smartReplySuggestionsFlow = ai.defineFlow(
  {
    name: 'smartReplySuggestionsFlow',
    inputSchema: SmartReplySuggestionsInputSchema,
    outputSchema: SmartReplySuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
