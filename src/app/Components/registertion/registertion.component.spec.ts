import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistertionComponent } from './registertion.component';

describe('RegistertionComponent', () => {
  let component: RegistertionComponent;
  let fixture: ComponentFixture<RegistertionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistertionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistertionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
