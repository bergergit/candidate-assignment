import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { FootbalService } from './footbal.service';
import { ICompetitionResult } from '../interfaces/ICompetition';
import { environment } from '../../environments/environment';

export const mockCompetitionResult: ICompetitionResult = {
  count: 10,
  competitions: [{
    id: 1,
    name: 'Test',
    plan: 'TIER_ONE',
    currentSeason: {
      id: 2,
      startDate: '2021-01-01',
    },
  }]
};

describe('FootbalService', () => {
  let service: FootbalService;
  let httpTestingController: HttpTestingController;

  afterEach(() => {
    httpTestingController.verify();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(FootbalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fill competition Subject when selecting a season', async () => {
    spyOn(service, 'fetchCompetitions').and.callThrough();
    service.selectSeason('2021');

    const req = httpTestingController.expectOne(`${environment.api.url}/competitions`);
    expect(req.request.method).toEqual('GET');

    service.competitions
      .subscribe(competitions => {
        expect(service.fetchCompetitions).toHaveBeenCalledWith('2021');
        expect(competitions.length).toBe(1);
        expect(competitions[0].name).toBe('Test');
      });

    req.flush(mockCompetitionResult);

  });
});
