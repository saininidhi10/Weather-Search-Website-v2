/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VariableSharingService } from './variable-sharing.service';

describe('Service: VariableSharing', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VariableSharingService]
    });
  });

  it('should ...', inject([VariableSharingService], (service: VariableSharingService) => {
    expect(service).toBeTruthy();
  }));
});
