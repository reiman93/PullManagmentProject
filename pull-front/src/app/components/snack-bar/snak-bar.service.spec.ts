import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnakBarService } from './snak-bar.service';

describe('SnakBarService', () => {
  let service: SnakBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
    });
    service = TestBed.inject(SnakBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
