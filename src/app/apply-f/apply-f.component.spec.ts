import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyFComponent } from './apply-f.component';

describe('ApplyFComponent', () => {
  let component: ApplyFComponent;
  let fixture: ComponentFixture<ApplyFComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplyFComponent]
    });
    fixture = TestBed.createComponent(ApplyFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
