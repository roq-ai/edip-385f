import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { loanDetailValidationSchema } from 'validationSchema/loan-details';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.loan_detail
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getLoanDetailById();
    case 'PUT':
      return updateLoanDetailById();
    case 'DELETE':
      return deleteLoanDetailById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getLoanDetailById() {
    const data = await prisma.loan_detail.findFirst(convertQueryToPrismaUtil(req.query, 'loan_detail'));
    return res.status(200).json(data);
  }

  async function updateLoanDetailById() {
    await loanDetailValidationSchema.validate(req.body);
    const data = await prisma.loan_detail.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteLoanDetailById() {
    const data = await prisma.loan_detail.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
