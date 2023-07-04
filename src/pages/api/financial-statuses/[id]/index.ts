import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { financialStatusValidationSchema } from 'validationSchema/financial-statuses';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.financial_status
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getFinancialStatusById();
    case 'PUT':
      return updateFinancialStatusById();
    case 'DELETE':
      return deleteFinancialStatusById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getFinancialStatusById() {
    const data = await prisma.financial_status.findFirst(convertQueryToPrismaUtil(req.query, 'financial_status'));
    return res.status(200).json(data);
  }

  async function updateFinancialStatusById() {
    await financialStatusValidationSchema.validate(req.body);
    const data = await prisma.financial_status.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteFinancialStatusById() {
    const data = await prisma.financial_status.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
