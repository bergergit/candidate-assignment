import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Location } from '@angular/common';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { ITeam } from '../interfaces/ITeam';
import { FootbalService } from '../services/footbal.service';

import { TeamsPage } from './teams.page';

const mockedTeams: ITeam[] = [{
  id: 1,
  name: 'Team One',
}, {
  id: 2,
  name: 'Team Two',
}];

const routes: Routes = [
  {
    path: 'teams/players/:teamId',
    component: TeamsPage
  },
];

describe('TeamsPage', () => {
  let component: TeamsPage;
  let fixture: ComponentFixture<TeamsPage>;
  let mockedFootbalService: jasmine.SpyObj<FootbalService>;
  let location: Location;
  let router: Router;

  beforeEach(waitForAsync(() => {
    mockedFootbalService = jasmine.createSpyObj('FootbalService', ['getTeamsForCompetition']);
    TestBed.configureTestingModule({
      declarations: [ TeamsPage ],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule,
      ],
      providers: [
        { provide: FootbalService, useValue: mockedFootbalService },
      ]
    }).compileComponents();

    location = TestBed.inject(Location);
    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(TeamsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show teams', async () => {
    mockedFootbalService.getTeamsForCompetition.and.returnValue(of(mockedTeams));
    component.ngOnInit();
    fixture.detectChanges();
    const app = fixture.nativeElement;
    const teamItems = app.querySelectorAll('ion-item');
    expect(teamItems.length).toEqual(2);
    expect(teamItems[0].textContent).toContain('Team One');
    expect(teamItems[1].textContent).toContain('Team Two');
  });

  it('should navigate to correct players route', fakeAsync(() => {
    component.showPlayers({
      id: 5,
    });
    tick();
    expect(location.path()).toBe('/teams/players/5');
  }));
});
