import fs from 'fs';
import path from 'path';
import { type Review } from '../generated/prisma/client';
import { reviewRepository } from '../repositories/review.repository';
import { llmClient } from '../llm/client';

const template = fs.readFileSync(
   path.join(__dirname, '../prompts/summarize-reviews.txt'),
   'utf-8'
);

export const reviewService = {
   async getReviews(productId: number): Promise<Review[]> {
      return reviewRepository.getReviews(productId);
   },

   async summarizeReviews(productId: number): Promise<string> {
      const reviews = await reviewRepository.getReviews(productId, 10);
      const joinedReviews = reviews.map((r) => r.content).join('\n\n');
      const prompt = template.replace('{{reviews}}', joinedReviews);

      const { text: summary } = await llmClient.generateText({
         model: 'gpt-4.1',
         prompt,
         temperature: 0.2,
         maxToken: 500,
      });

      await reviewRepository.storeReviewSummary(productId, summary);

      return summary;
   },
};
