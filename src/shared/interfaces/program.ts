export interface ProgramsResponse {
  men: ProgramCategory[];
  women: ProgramCategory[];
}

export interface ProgramCategory {
  title: string;
  fee: number;
  qualifier: string[];
  final: string[];
}
