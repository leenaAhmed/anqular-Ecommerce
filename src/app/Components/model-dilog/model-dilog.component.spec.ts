import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelDilogComponent } from './model-dilog.component';

describe('ModelDilogComponent', () => {
  let component: ModelDilogComponent;
  let fixture: ComponentFixture<ModelDilogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelDilogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelDilogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
