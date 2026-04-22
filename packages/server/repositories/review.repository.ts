import { adapter } from '../util/prisma.adapter';
import { PrismaClient, type Review } from '../generated/prisma/client';
import type { number } from 'zod';

export const reviewRepository = {
   async getReviews(productId: number, limit?: number): Promise<Review[]> {
      const prisma = new PrismaClient({ adapter });

      return prisma.review.findMany({
         where: { productId },
         orderBy: { createAt: 'desc' },
         take: limit,
      });
   },
};
