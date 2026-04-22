import { adapter } from '../util/prisma.adapter';
import { PrismaClient, type Review } from '../generated/prisma/client';

export const reviewRepository = {
   async getReviews(productId: number): Promise<Review[]> {
      const prisma = new PrismaClient({ adapter });

      return prisma.review.findMany({
         where: { productId },
         orderBy: { createAt: 'desc' },
      });
   },
};
