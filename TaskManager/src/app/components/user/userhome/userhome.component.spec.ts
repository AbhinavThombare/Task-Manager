import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { UserhomeComponent } from './userhome.component';

describe('UserhomeComponent', () => {
  let component: UserhomeComponent;
  let fixture: ComponentFixture<UserhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,MatSnackBarModule], 
      declarations: [ UserhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
