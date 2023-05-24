import {AfterViewChecked, Component, OnInit, Renderer2} from '@angular/core';
import {AspiratorPosition} from "../../interfaces/aspirator-position.interface";
import {GridLayout} from "../../interfaces/grid-layout.interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

const cardinalPoints: string[] = ['N', 'E', 'S', 'W'];

@Component({
  selector: 'app-aspirator',
  templateUrl: './aspirator.component.html',
  styleUrls: ['./aspirator.component.css']
})

export class AspiratorComponent implements OnInit {
  aspirator: AspiratorPosition = {x: 0, y: 0, orientation: 'N'};

  grid: GridLayout = {rows: [], columns: []};
  maxGridRows: number = 0;
  maxGridColumns: number = 0;
  instructions: string = '';
  aspiratorCommandForm : FormGroup = this.formBuilder.group({
    maxGridRows: [null, [Validators.required]],
    maxGridColumns: [null, [Validators.required]],
    aspiratorInitialX: [null, [Validators.required]],
    aspiratorInitialY: [null, [Validators.required]],
    aspiratorInitialOrientation: ['', [Validators.required, Validators.pattern(/^[NSEW]+$/), Validators.maxLength(1)]],
    instructions: ['', [Validators.required, Validators.pattern(/^[DGA]+$/)]],
  });
  submitted: boolean = false;
  finalPosition: string = '';

  constructor(private formBuilder: FormBuilder, private renderer: Renderer2) {
  }

  ngOnInit() {
    //this.aspiratorCommandForm =
  }


  /**
   * use to turn aspirator to Left
   * @param orientation
   * @private
   */
  private pivotToLeft(orientation: string): void {
    // check if passed orientation is good one of cardinal point
    if (cardinalPoints.includes(orientation)) {
      const indexOfOrientation: number = cardinalPoints.indexOf(orientation);
      const indexOfNewOrientationPoint: number = (indexOfOrientation - 1 + 4) % 4;
      this.aspirator.orientation = cardinalPoints[indexOfNewOrientationPoint];
    }
  }

  /**
   * used to turn aspirator to right
   * @param orientation
   * @private
   */
  private pivotToRight(orientation: string): void {
    if (cardinalPoints.includes(orientation)) {
      const indexOfOrientation: number = cardinalPoints.indexOf(orientation);
      const indexOfNewOrientationPoint: number = (indexOfOrientation + 1) % 4;
      this.aspirator.orientation = cardinalPoints[indexOfNewOrientationPoint];
    }
  }


  /**
   * used tp move aspirator forward the grid;
   * @private
   */
  private moveForWard(): void {

    // on each switch case we control the current y or x  coordinate of the aspirator to avoid moving overs the grid;

    switch (this.aspirator.orientation) {
      case 'N':
        if (this.aspirator.y < this.maxGridColumns - 1) {
          this.aspirator.y++;
        }
        break;
      case 'S':

        if (this.aspirator.y > 0) {
          this.aspirator.y--;
        }
        break;

      case 'E':
        if (this.aspirator.x < this.maxGridRows - 1) {
          this.aspirator.x++;
        }
        break;

      case 'W':
        if (this.aspirator.x > 0) {
          this.aspirator.x--;
        }
        break;
    }
  }

  private initializeGrid() {
    this.grid.columns = Array.from({length: this.maxGridColumns}, (_, index) => index);
    this.grid.rows = Array.from({length: this.maxGridRows}, (_, index) => index);
    //this.setGridStyles();

  }

  private setAspiratorPosition(x: number, y: number, orientation: string) {
    this.aspirator.y = y;
    this.aspirator.x = x;
    this.aspirator.orientation = orientation;
  }

  get aspiratorCommandF() {
    return this.aspiratorCommandForm.controls;
  }

  onSubmitForm() {
    this.submitted = true;
    if (this.aspiratorCommandForm.invalid) {

      return;

    }
    this.maxGridColumns = this.aspiratorCommandForm.value.maxGridColumns;
    this.maxGridRows = this.aspiratorCommandForm.value.maxGridRows;

    this.initializeGrid();
    this.setAspiratorPosition(this.aspiratorCommandForm.value.aspiratorInitialX, this.aspiratorCommandForm.value.aspiratorInitialY, this.aspiratorCommandForm.value.aspiratorInitialOrientation);
    this.finalPosition = this.execInstructions(this.aspiratorCommandForm.value.instructions);
  }

  execInstructions(instructions: string): string {

    for (const instruction of instructions) {
      if (instruction === "D") {
        this.pivotToRight(this.aspirator.orientation);
      }

      if (instruction === "G") {
        this.pivotToLeft(this.aspirator.orientation);
      }
      if (instruction === "A") {
        this.moveForWard();
      }
    }

    return `x = ${this.aspirator.x}, y = ${this.aspirator.y}, orientation = ${this.aspirator.orientation}`;
  }

  aspiratorIsHere(x: number, y: number): boolean {
    return this.aspirator.x === y && this.aspirator.y === x;
  }


  get getGridTemplateColumns() {
    return `repeat(${this.grid.columns.length}, 1fr)`;
  }

  get getGridTemplateRows() {
    const numRows = this.grid.rows.length;
    return `repeat(${this.grid.rows.length}, 1fr)`;
  }
}
