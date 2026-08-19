export const competitionStatusEnum = {
  created: 'CREATED',
  pending: 'PENDING',
  confirmed: 'CONFIRMED',
  rejected: 'REJECTED',
  cancelled: 'CANCELED',
} as const;

export type CompetitionStatus =
  (typeof competitionStatusEnum)[keyof typeof competitionStatusEnum];

export interface CompetitionResponse {
  id: string;
  status: CompetitionStatus;
}

export interface August2026Interface {
  gender: 'male' | 'female';
  name: string;
  category: 'strength' | 'endurance' | 'flexibility';
  level: 'intermediate' | 'advanced' | 'elite';
  age: number;
  phone: string;
}
export interface CompetitionData {
  id: string;
  competition: string;
  userId: number;
  data: August2026Interface;
  status: CompetitionStatus;
  history: {
    time: string;
    value: string;
  }[];
  payment: string[];
  submittedAt: string;
  updatedAt: string;
}