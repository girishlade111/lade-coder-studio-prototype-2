'use server';

import { optimizePrompt } from '@/ai/flows/optimize-prompt';
import { modifyWebsite } from '@/ai/flows/modify-website';
import { suggestTemplates } from '@/ai/flows/template-suggestions';

export async function optimizePromptAction(prompt: string) {
  try {
    const result = await optimizePrompt({ prompt });
    return { success: true, data: result };
  } catch (error) {
    console.error('Error optimizing prompt:', error);
    return { success: false, error: 'Failed to optimize prompt.' };
  }
}

export async function generateCodeAction(prompt: string, baseCode = '') {
   try {
    const result = await modifyWebsite({ prompt, baseCode });
    return { success: true, data: result };
  } catch (error) {
    console.error('Error generating code:', error);
    return { success: false, error: 'Failed to generate code.' };
  }
}

export async function suggestTemplatesAction(prompt: string) {
  try {
    const result = await suggestTemplates({ prompt });
    return { success: true, data: result };
  } catch (error) {
    console.error('Error suggesting templates:', error);
    return { success: false, error: 'Failed to suggest templates.' };
  }
}
