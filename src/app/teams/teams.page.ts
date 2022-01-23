import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ITeam } from '../interfaces/ITeam';
import { FootbalService } from '../services/footbal.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPage implements OnInit {

  teams$: Observable<ITeam[]>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private competitionService: FootbalService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(param => {
      this.teams$ = this.competitionService.getTeamsForCompetition(param.competitionId, param.season);
    });
  }

  showPlayers(team: ITeam) {
    this.router.navigate([`/teams/players/${team.id}`]);
  }

}
