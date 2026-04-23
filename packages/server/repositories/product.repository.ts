import { PrismaClient } from '../generated/prisma/client';
import { adapter } from '../util/prisma.adapter';

const prisma = new PrismaClient({ adapter });
export const productRepository = {
   getProduct(productId: number) {
      return prisma.product.findUnique({
         where: { id: productId },
      });
   },
};
