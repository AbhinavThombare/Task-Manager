import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GloballoaderComponent } from './globalloader.component';

describe('GloballoaderComponent', () => {
  let component: GloballoaderComponent;
  let fixture: ComponentFixture<GloballoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GloballoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GloballoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
