import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { financialStatusValidationSchema } from 'validationSchema/financial-statuses';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getFinancialStatuses();
    case 'POST':
      return createFinancialStatus();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getFinancialStatuses() {
    const data = await prisma.financial_status
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'financial_status'));
    return res.status(200).json(data);
  }

  async function createFinancialStatus() {
    await financialStatusValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.financial_status.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
