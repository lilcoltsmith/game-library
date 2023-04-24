import { TestBed } from '@angular/core/testing';

import { GameLibraryApiService } from './game-library-api.service';

describe('GameLibraryApiService', () => {
  let service: GameLibraryApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameLibraryApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
