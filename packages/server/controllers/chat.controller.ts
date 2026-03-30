import type { Request, Response } from 'express';
import z, { treeifyError } from 'zod';

const chatSchema = z.object({
   prompt: z
      .string()
      .trim()
      .min(1, 'Prompt is required.')
      .max(1000, 'Prompt is too long (Max is 1000 characters)'),
   conversationId: z.guid(),
});

export const chatController = {
   async sendMessage(req: Request, res: Response) {
      const parseResult = chatSchema.safeParse(req.body);
      if (!parseResult.success) {
         res.status(400).json(treeifyError(parseResult.error));
         return;
      }

      try {
         const { prompt, conversationId } = req.body;
         const response = await chatController.sendMessage(
            prompt,
            conversationId
         );

         res.json({ message: response });
      } catch (error) {
         res.status(500).json({ error: 'Failed to generate a response' });
      }
   },
};
