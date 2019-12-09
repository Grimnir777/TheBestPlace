import { TestBed } from '@angular/core/testing';

import { CityDataService } from './city-data.service';

describe('CityDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CityDataService = TestBed.get(CityDataService);
    expect(service).toBeTruthy();
  });
});
