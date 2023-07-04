const mapping: Record<string, string> = {
  businesses: 'business',
  'financial-details': 'financial_detail',
  'financial-statuses': 'financial_status',
  'loan-applications': 'loan_application',
  'loan-details': 'loan_detail',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
