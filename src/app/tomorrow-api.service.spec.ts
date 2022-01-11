/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TomorrowApiService } from './tomorrow-api.service';

describe('Service: TomorrowApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TomorrowApiService]
    });
  });

  it('should ...', inject([TomorrowApiService], (service: TomorrowApiService) => {
    expect(service).toBeTruthy();
  }));
});
