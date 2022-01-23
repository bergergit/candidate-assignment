import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ICompetition } from '../interfaces/ICompetition';
import { FootbalService } from '../services/footbal.service';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.page.html',
  styleUrls: ['./competitions.page.scss'],
})
export class CompetitionsPage implements OnInit {

  minSesonYear = 2017;
  seasonSelected = false;
  buttons = [];
  competitions$: Observable<ICompetition[]>;

  constructor(
    private competitionService: FootbalService,
    private actionSheetController: ActionSheetController,
    private router: Router
  ) { }

  ngOnInit() {
    this.competitions$ = this.competitionService.competitions;
    this.createSeasonButtons();
  }

  createSeasonButtons() {
    const currentYear = new Date().getFullYear();
    for (let i = this.minSesonYear; i <= currentYear; i++) {
      this.buttons.push({
        text: i,
        data: String(i),
      });
    }
  }

  async selectSeason() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Season',
      buttons: this.buttons
    });
    await actionSheet.present();

    const { data } = await actionSheet.onDidDismiss();
    this.seasonSelected = true;
    this.competitionService.selectSeason(data);
  }

  showTeams(competition: ICompetition) {
    this.router.navigate([`/teams/competition/${competition.id}/season/${this.competitionService.currentSeason}`]);
  }

}
