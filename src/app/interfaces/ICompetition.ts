export interface ICompetitionResult {
  count: number;
  competitions: ICompetition[];
}

export interface ICompetition {
  id: number;
  name: string;
  code?: string;
  emblemUrl?: string;
  plan?: 'TIER_ONE' | 'TIER_TWO' | 'TIER_THREE' | 'TIER_FOUR';
  currentSeason?: {
    id: number;
    startDate: string;
    endDate?: string;
  };
}
