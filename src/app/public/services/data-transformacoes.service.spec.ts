import { TestBed } from '@angular/core/testing';

import { DataTransformacoesService } from './data-transformacoes.service';

describe('DataTransformacoesService', () => {
  let service: DataTransformacoesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataTransformacoesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
