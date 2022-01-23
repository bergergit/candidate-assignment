import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ITeam } from '../interfaces/ITeam';
import { FootbalService } from '../services/footbal.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.page.html',
  styleUrls: ['./players.page.scss'],
})
export class PlayersPage implements OnInit {

  team$: Observable<ITeam>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private competitionService: FootbalService,
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(param => {
      this.team$ = this.competitionService.getTeam(param.teamId);
    });

  }

}
