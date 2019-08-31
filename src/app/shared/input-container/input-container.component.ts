import { Component, OnInit, Input, ContentChild, AfterContentInit } from '@angular/core';
import { NgModel, FormControlName } from '@angular/forms';
import { NgClass } from '@angular/common';
import { utils } from '../utils/utils';

@Component({
  selector: 'app-input-container',
  templateUrl: './input-container.component.html',
  styleUrls: ['./input-container.component.scss']
})
export class InputContainerComponent implements OnInit, AfterContentInit {

  input;
  @Input() label: string;
  @Input() errorMessage: string;

  @ContentChild(NgModel, { static: false }) model: NgModel;
  @ContentChild(FormControlName, { static: false }) control: FormControlName;

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {  
    this.input = this.model || this.control;
   
    if (!this.input) {
      throw new Error('Error de ngModel')
    }
  }

  hasSuccess(): boolean {
    return this.input.valid && (this.input.dirty || this.input.touched);
  }

  hasError(): boolean {
    return this.input.invalid && (this.input.dirty || this.input.touched);
  }

}
