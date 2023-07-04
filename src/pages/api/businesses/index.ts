import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { businessValidationSchema } from 'validationSchema/businesses';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getBusinesses();
    case 'POST':
      return createBusiness();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getBusinesses() {
    const data = await prisma.business
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'business'));
    return res.status(200).json(data);
  }

  async function createBusiness() {
    await businessValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.financial_detail?.length > 0) {
      const create_financial_detail = body.financial_detail;
      body.financial_detail = {
        create: create_financial_detail,
      };
    } else {
      delete body.financial_detail;
    }
    if (body?.financial_status?.length > 0) {
      const create_financial_status = body.financial_status;
      body.financial_status = {
        create: create_financial_status,
      };
    } else {
      delete body.financial_status;
    }
    if (body?.loan_application?.length > 0) {
      const create_loan_application = body.loan_application;
      body.loan_application = {
        create: create_loan_application,
      };
    } else {
      delete body.loan_application;
    }
    if (body?.loan_detail?.length > 0) {
      const create_loan_detail = body.loan_detail;
      body.loan_detail = {
        create: create_loan_detail,
      };
    } else {
      delete body.loan_detail;
    }
    const data = await prisma.business.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
