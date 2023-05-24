import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AspiratorComponent } from './aspirator.component';

describe('AspiratorComponent', () => {
  let component: AspiratorComponent;
  let fixture: ComponentFixture<AspiratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AspiratorComponent]
    });
    fixture = TestBed.createComponent(AspiratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
