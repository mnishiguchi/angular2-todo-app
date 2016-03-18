import {
  Component,
  OnInit,
  Input
} from 'angular2/core';
import { Todo }              from '../models/todo.model';
import { TodoService }       from '../services/todo.service';

@Component({
  selector: 'TodoList',
  styles: [`
    .selected {
      color: red;
    }
    li {
      list-style: none;
    }
  `],
  template: `
    <div>
      <ul>
        <li *ngFor="#todo of todos"
          (click)="handleSelect( todo )"
          [class.selected]="isSelected( todo )" >
          {{ todo.title }}
        </li>
      </ul>
    </div>
  `
})
export class TodoList {

  @Input() todos:Todo[];

  selectedItem:Todo;

  isSelected( todo:Todo ) {
    return todo === this.selectedItem;
  }

  handleSelect( todo:Todo ) {
    this.selectedItem = todo;
  }
}
