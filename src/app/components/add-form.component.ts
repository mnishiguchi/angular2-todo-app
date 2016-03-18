import { Component } from 'angular2/core';
import { Todo } from '../models/todo.model';

@Component({
  selector: 'AddForm',
  template: `
    <form (submit)="handleAddTodo( todo )">
      <input type="text"
        [(ngModel)]="name"
        placeholder="Create a todo">
    </form>
    {{name}}
  `
})
export class AddForm {

  handleAddTodo( todo:Todo ) {
    console.log( todo.title );
  }
}
