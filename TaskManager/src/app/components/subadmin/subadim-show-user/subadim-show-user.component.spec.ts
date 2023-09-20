import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubadimShowUserComponent } from './subadim-show-user.component';

describe('SubadimShowUserComponent', () => {
  let component: SubadimShowUserComponent;
  let fixture: ComponentFixture<SubadimShowUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      declarations: [ SubadimShowUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubadimShowUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
