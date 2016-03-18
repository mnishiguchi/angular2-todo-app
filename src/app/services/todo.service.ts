import { Injectable } from 'angular2/core';
import { Todo }  from '../models/todo.model';

const TODOS:Todo[] = [
  {
    title: "Read the todo list",
    completed: true
  },
  {
    title: "Look at the code",
    completed: false
  }
];


@Injectable()
export class TodoService {
  todos: Todo[];

  getTodos() {
    return Promise.resolve( this.todos );
  }

  constructor () {
    this.todos = TODOS;
  }

  add( todo:string ): void {

    if ( !todo.length ) { return; }

    this.todos.push({
      title: todo,
      completed: false
    });
  }

  toggle( todo:Todo ): void {
    todo.completed = !todo.completed;
  }
}
