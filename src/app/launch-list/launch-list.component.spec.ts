import { Apollo } from 'apollo-angular';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { MatCardModule } from '@angular/material/card';
import { RelativeTimePipe } from '../core/helpers/pipes/relative-time/relative-time.pipe';
import { launchReducers } from '../store/reducers';
import { LaunchListComponent } from './launch-list.component';

describe('LaunchListComponent', () => {
  let component: LaunchListComponent;
  let fixture: ComponentFixture<LaunchListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        LaunchListComponent, 
        RelativeTimePipe 
      ],
      imports: [
        RouterModule,
        StoreModule.forRoot(launchReducers),
        MatCardModule
      ],
      providers: [ Apollo ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaunchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
