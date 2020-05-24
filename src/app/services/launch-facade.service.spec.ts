import { Apollo } from 'apollo-angular';
import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { launchReducers } from '../store/reducers';
import { LaunchFacadeService } from './launch-facade.service';

describe('LaunchFacadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({
  	imports: [ StoreModule.forRoot(launchReducers) ],
    providers: [ Apollo ]
  }));

  it('should be created', () => {
    const service: LaunchFacadeService = TestBed.get(LaunchFacadeService);
    expect(service).toBeTruthy();
  });
});
