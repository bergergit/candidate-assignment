import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ICompetition, ICompetitionResult} from '../interfaces/ICompetition';
import { ITeam, ITeamResult } from '../interfaces/ITeam';

const httpOptions = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  headers: new HttpHeaders({ 'X-Auth-Token': environment.api.authentication })
};

@Injectable({
  providedIn: 'root'
})
export class FootbalService {
  private competitionsList: Subject<ICompetition[]>;
  private pCurrentSeason: string;

  constructor(
    private httpClient: HttpClient
  ) {
    this.competitionsList = new Subject();
  }

  get competitions(): Observable<ICompetition[]> {
    return this.competitionsList;
  }

  get currentSeason() {
    return this.pCurrentSeason;
  }

  /**
   * Get competitions where startDate of the season is like the received season
   * PS: I'm also filtering for plan = TIER_ONE because I'm on a Free plan for the API
   *
   * @param season the competition year season (2019, 2020, 2021)
   * @returns List of Competitions
   */
  public fetchCompetitions(season: string): Observable<ICompetition[]> {
    return this.httpClient.get<ICompetitionResult>(`${environment.api.url}/competitions`, httpOptions)
      .pipe(
        map(result => result.competitions.filter(
          competition => competition.currentSeason?.startDate?.startsWith(season)
            && competition.plan === 'TIER_ONE'
        )),
      );
  }

  /**
   * Get all teams for the given competitionId
   *
   * @param competitionId the Competition ID
   * @param season the season to filter
   * @returns List of teams
   */
  public getTeamsForCompetition(competitionId: number, season: string): Observable<ITeam[]> {
    return this.httpClient.get<ITeamResult>(`${environment.api.url}/competitions/${competitionId}/teams`,
      {
        ...httpOptions,
        params: {
          season
        }
      })
      .pipe(
        map(result => result.teams)
      );
  }

  /**
   * Get one specific team
   *
   * @param teamId the Team ID
   * @returns One single Team
   */
  getTeam(teamId: any): Observable<ITeam> {
    return this.httpClient.get<ITeam>(`${environment.api.url}/teams/${teamId}`, httpOptions);
  }

  /**
   * Fetches the list of Competitions for the given season,
   * and emit the value into competitionsList Subject
   *
   * @param season the competition year season (2019, 2020, 2021)
   */
  public selectSeason(season: string): void {
    this.pCurrentSeason = season;
    this.competitionsList.next(null);
    this.fetchCompetitions(season).subscribe(result => {
      this.competitionsList.next(result);
    });
  }
}
