export const Endpoints = {
  register: '/v1/auth/register',
  verify: '/v1/auth/verify',
  competition_august_2026: '/v1/competition/august2026',
  competition: '/v1/competition/',
  competition_by_id: (id: string | number) => `/competition/${id}`,
};
