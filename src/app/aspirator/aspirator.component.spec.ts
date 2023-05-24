import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AspiratorComponent } from './aspirator.component';
import {FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

describe('AspiratorComponent', () => {
  let component: AspiratorComponent;
  let fixture: ComponentFixture<AspiratorComponent>;
  let form: FormGroup;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [AspiratorComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AspiratorComponent);
    component = fixture.componentInstance;
    form = component.aspiratorCommandForm;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

  });
  it('should verify if form corrected mounted and all input elements ares present', ()=>{
    const formElements = fixture.debugElement.nativeElement.querySelector("#aspiratorForm");
    const inputElements = formElements.querySelectorAll('input');
    expect(inputElements.length).toEqual(6);
  })

  it('should verify Test Invalid Form', ()=>{

    const maxGridRows = form.get('maxGridRows');
    const maxGridColumns = form.get('maxGridColumns');
    const aspiratorInitialX = form.get('aspiratorInitialX');
    const aspiratorInitialY = form.get('aspiratorInitialY');
    const aspiratorInitialOrientation = form.get('aspiratorInitialOrientation');
    const instructions = form.get('instructions');

    maxGridRows?.setValue(10);
    maxGridColumns?.setValue(10);
    aspiratorInitialX?.setValue(5);
    aspiratorInitialY?.setValue(5);
    aspiratorInitialOrientation?.setValue('N');
    instructions?.setValue('DADADEADAA');
    expect(form.invalid).toBeTruthy();


  })
  it('should verify Test 1', ()=>{

    const maxGridRows = form.get('maxGridRows');
    const maxGridColumns = form.get('maxGridColumns');
    const aspiratorInitialX = form.get('aspiratorInitialX');
    const aspiratorInitialY = form.get('aspiratorInitialY');
    const aspiratorInitialOrientation = form.get('aspiratorInitialOrientation');
    const instructions = form.get('instructions');

    maxGridRows?.setValue(10);
    maxGridColumns?.setValue(10);
    aspiratorInitialX?.setValue(5);
    aspiratorInitialY?.setValue(5);
    aspiratorInitialOrientation?.setValue('N');
    instructions?.setValue('DADADADAA');
    expect(form.valid).toBeTruthy();
    component.onSubmitForm();
    expect(component.finalPosition).toEqual("x = 5, y = 6, orientation = N")
  })


});
