export const competitionStatusEnum = {
  created: 'CREATED',
  pending: 'PENDING',
  approved: 'CONFIRMED',
  rejected: 'REJECTED',
  cancelled: 'CANCELED',
} as const;

export type CompetitionStatus =
  (typeof competitionStatusEnum)[keyof typeof competitionStatusEnum];

export interface CompetitionResponse {
  id: string;
  status: CompetitionStatus;
}

export interface August2026DtoInterface {
  gender: 'male' | 'female';
  name: string;
  category: 'strength' | 'endurance' | 'flexibility';
  level: 'intermediate' | 'advanced' | 'elite';
  age: number;
  phone: string;
}