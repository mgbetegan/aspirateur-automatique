import {Component, OnInit} from '@angular/core';
import {AspiratorPosition} from "../../interfaces/aspirator-position.interface";
import {GridLayout} from "../../interfaces/grid-layout.interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
const cardinalPoints : string[] = ['N','E','S','W'];
@Component({
  selector: 'app-aspirator',
  templateUrl: './aspirator.component.html',
  styleUrls: ['./aspirator.component.css']
})

export class AspiratorComponent implements  OnInit{
  // @ts-ignore
  aspirator : AspiratorPosition = {x:0,y:0,orientation:'N'};

  // @ts-ignore
  grid : GridLayout = {rows: [], columns : []};
  maxGridRows: number = 0;
  maxGridColumns: number = 0;
  instructions: string = '';
  aspiratorCommandForm !: FormGroup;
  submitted: boolean = false;
  finalPosition: string = '';

  constructor( private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.aspiratorCommandForm = this.formBuilder.group({
      maxGridRows: [null,[Validators.required]],
      maxGridColumns: [null,[Validators.required]],
      aspiratorInitialX:[null, [Validators.required]],
      aspiratorInitialY:[null, [Validators.required]],
      aspiratorInitialOrientation:['', [Validators.required,Validators.pattern(/^[NSEW]+$/),Validators.maxLength(1)]],
      instructions:['', [Validators.required, Validators.pattern(/^[DGA]+$/)]],
    })
  }

  private pivotToLeft(orientation:string):void{
    // check if passed orientation is good one of cardinal point
    if(cardinalPoints.includes(orientation)) {
      const indexOfOrientation: number = cardinalPoints.indexOf(orientation);
      const indexOfNewOrientationPoint: number = (indexOfOrientation - 1 + 4) % 4;
      this.aspirator.orientation = cardinalPoints[indexOfNewOrientationPoint];
    }
  }

  private pivotToRight(orientation:string):void{
    if(cardinalPoints.includes(orientation)){
      const indexOfOrientation:number = cardinalPoints.indexOf(orientation);
      const indexOfNewOrientationPoint:number = (indexOfOrientation + 1) % 4;
      this.aspirator.orientation = cardinalPoints[indexOfNewOrientationPoint];
    }
  }



  private moveForWard():void{


    switch (this.aspirator.orientation){
      case 'N':
        if(this.aspirator.y < this.maxGridColumns -1 ){
           this.aspirator.y++;
        }
        break;
      case 'S':

        if(this.aspirator.y > 0 ){
          this.aspirator.y--;
        }
        break;

      case 'E':

        if(this.aspirator.x < this.maxGridRows -1 ){
          this.aspirator.x++;
        }
        break;

      case 'W':
        if(this.aspirator.x > 0){
          this.aspirator.x--;
        }
        break;

    }
  }

  private initializeGrid(){
    this.grid.columns = Array.from({ length: this.maxGridColumns }, (_, index) => index );
    this.grid.rows = Array.from({ length: this.maxGridRows }, (_, index) => index );
  }

  private setAspiratorPosition(x:number,y:number,orientation:string){
    this.aspirator.y = y;
    this.aspirator.x = x;
    this.aspirator.orientation = orientation;
  }

  get aspiratorCommandF() {
    return this.aspiratorCommandForm.controls;
  }

  onSubmitForm(){
    this.submitted = true;
    if(this.aspiratorCommandForm.invalid){

      return;

    }
    this.maxGridColumns = this.aspiratorCommandForm.value.maxGridColumns;
    this.maxGridRows = this.aspiratorCommandForm.value.maxGridRows;
    this.initializeGrid();
    this.setAspiratorPosition(this.aspiratorCommandForm.value.aspiratorInitialX,this.aspiratorCommandForm.value.aspiratorInitialY,this.aspiratorCommandForm.value.aspiratorInitialOrientation);
    this.finalPosition = this.execInstructions(this.aspiratorCommandForm.value.instructions);
  }

  execInstructions(instructions: string): string{

    for(const instruction of instructions){
       if(instruction === "D"){
         this.pivotToRight(this.aspirator.orientation);
       }

      if(instruction === "G"){
        this.pivotToLeft(this.aspirator.orientation);
      }
      if(instruction === "A"){
        this.moveForWard();
      }
    }

    console.log(`La position Finale est : ${this.aspirator.x}, ${this.aspirator.y}, ${this.aspirator.orientation}`);

    return `x = ${this.aspirator.x}, y = ${this.aspirator.y}, orientation = ${this.aspirator.orientation}`;
  }
}
