import { Apollo } from 'apollo-angular';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { MatCardModule } from '@angular/material/card';
import { launchReducers } from '../store/reducers';
import { LaunchDetailsComponent } from './launch-details.component';

describe('LaunchDetailsComponent', () => {
  let component: LaunchDetailsComponent;
  let fixture: ComponentFixture<LaunchDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaunchDetailsComponent ],
      imports: [
        RouterTestingModule,
        StoreModule.forRoot(launchReducers),
        MatCardModule
      ],
      providers: [ Apollo, Store ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaunchDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
