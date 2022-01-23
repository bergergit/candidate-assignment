import { ICompetition } from './ICompetition';

export interface ITeamResult {
  count: number;
  competitions: ICompetition;
  teams: ITeam[];
}

export interface ITeam {
  id: number;
  area?: {
    id: number;
    name: string;
  };
  activeCompetitions?: ICompetition[];
  name?: string;
  shortName?: string;
  address?: string;
  phone?: string;
  crestUrl?: string;
  website?: string;
  email?: string;
  squad?: Player[];
}

export interface Player {
  id: number;
  name: string;
  position?: string;
  nationality?: string;
}
