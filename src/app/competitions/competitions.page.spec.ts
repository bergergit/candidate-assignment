import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { ActionSheetController, IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { ICompetition } from '../interfaces/ICompetition';
import { FootbalService } from '../services/footbal.service';

import { CompetitionsPage } from './competitions.page';
import { Router, Routes } from '@angular/router';

const mockedActionSheetResponse = {
  present: () => Promise.resolve(),
  onDidDismiss: () => Promise.resolve({
    data: '2021'
  })
};

const mockedCompetitions: ICompetition[] = [{
  id: 1,
  name: 'Test One',
  plan: 'TIER_ONE',
}, {
  id: 2,
  name: 'Test Two',
  plan: 'TIER_ONE',
}];

const routes: Routes = [
  {
    path: 'teams/competition/:competitionId/season/:season',
    component: CompetitionsPage
  },
];

describe('CompetitionsPage', () => {
  let component: CompetitionsPage;
  let fixture: ComponentFixture<CompetitionsPage>;
  let mockedFootbalService: jasmine.SpyObj<FootbalService>;
  let mockedActionSheet: jasmine.SpyObj<ActionSheetController>;
  let location: Location;
  let router: Router;

  beforeEach(waitForAsync(() => {
    mockedFootbalService = jasmine.createSpyObj('FootbalService', ['fetchCompetitions', 'selectSeason', 'currentSeason']);
    mockedActionSheet = jasmine.createSpyObj('ActionSheetController', ['create']);
    mockedActionSheet.create.and.returnValue(Promise.resolve(mockedActionSheetResponse as any));

    TestBed.configureTestingModule({
      declarations: [
        CompetitionsPage
      ],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule.withRoutes(routes),
      ],
      providers: [
        { provide: FootbalService, useValue: mockedFootbalService },
        { provide: ActionSheetController, useValue: mockedActionSheet }
      ]
    }).compileComponents();

    location = TestBed.inject(Location);
    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(CompetitionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router.initialNavigation();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call competitionService.selectSeason', async () => {
    mockedFootbalService.fetchCompetitions.and.returnValue(of([]));
    await component.selectSeason();
    expect(mockedFootbalService.selectSeason).toHaveBeenCalledWith('2021');
  });

  it('should show competitions', async () => {
    mockedFootbalService.selectSeason.and.callThrough();
    mockedFootbalService.fetchCompetitions.and.returnValue(of(mockedCompetitions));
    component.competitions$ = of(mockedCompetitions);
    fixture.detectChanges();
    const app = fixture.nativeElement;
    const competitionItems = app.querySelectorAll('ion-item');
    expect(competitionItems.length).toEqual(2);
    expect(competitionItems[0].textContent).toContain('Test One');
    expect(competitionItems[1].textContent).toContain('Test Two');
  });

  it('should navigate to correct team route', fakeAsync(() => {
    // eslint-disable-next-line @typescript-eslint/dot-notation
    (mockedFootbalService as any)['currentSeason'] = '2021';
    component.showTeams({
      id: 5,
      name: 'John'
    });
    tick();
    expect(location.path()).toBe('/teams/competition/5/season/2021');
  }));

});
