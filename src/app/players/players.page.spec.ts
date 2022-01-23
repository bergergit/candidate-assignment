import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { ITeam } from '../interfaces/ITeam';
import { FootbalService } from '../services/footbal.service';

import { PlayersPage } from './players.page';

const mockedTeam: ITeam = {
  id: 1,
  name: 'Barcelona',
  squad: [{
    id: 10,
    name: 'Cristiano Ronaldo'
  }, {
    id: 11,
    name: 'Ronaldinho Gaúcho'
  }]
};


describe('PlayersPage', () => {
  let component: PlayersPage;
  let fixture: ComponentFixture<PlayersPage>;
  const mockedFootbalService = jasmine.createSpyObj('FootbalService', ['getTeam']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayersPage ],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: FootbalService, useValue: mockedFootbalService },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PlayersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show team info', async () => {
    mockedFootbalService.getTeam.and.returnValue(of(mockedTeam));
    component.ngOnInit();
    fixture.detectChanges();
    const app = fixture.nativeElement;
    const ionCard = app.querySelectorAll('ion-card');
    expect(ionCard.length).toEqual(1);
    const ionCardTitle = app.querySelectorAll('ion-card-title');
    expect(ionCardTitle.length).toEqual(1);
    expect(ionCardTitle[0].textContent).toContain('Barcelona');
  });

  it('should show team players', async () => {
    mockedFootbalService.getTeam.and.returnValue(of(mockedTeam));
    component.ngOnInit();
    fixture.detectChanges();
    const app = fixture.nativeElement;
    const playerItems = app.querySelectorAll('ion-item');
    expect(playerItems.length).toEqual(2);
    expect(playerItems[0].textContent).toContain('Cristiano Ronaldo');
    expect(playerItems[1].textContent).toContain('Ronaldinho Gaúcho');
  });
});
