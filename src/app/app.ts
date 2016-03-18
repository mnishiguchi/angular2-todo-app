/*
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit

} from 'angular2/core';
// import { RouteConfig, Router } from 'angular2/router';

// Components.
import { Header }   from './components/header.component';
import { AddForm }  from './components/add-form.component';
import { TodoList } from './components/todo-list.component';
import { Footer }   from './components/footer.component';

// Services
import { TodoService } from './services/todo.service';

// Models.
import { Todo } from './models/todo.model';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  pipes: [ ],
  providers: [ TodoService ],
  directives: [
    Header,
    AddForm,
    TodoList,
    Footer
   ],
  styles: [`
  `],
  template: `
    <Header></Header>
    <AddForm></AddForm>
    <TodoList [todos]="todos"></TodoList>
    <Footer></Footer>
  `
 /*
    <main>
      <router-outlet></router-outlet>
    </main>
  */
})
// @RouteConfig([
//   { path: '/',      name: 'Index', component: Home, useAsDefault: true },
//   // { path: '/home',  name: 'Home',  component: Home },
//   // Async load a component using Webpack's require with es6-promise-loader and webpack `require`
//   // { path: '/about', name: 'About', loader: () => require('es6-promise!./about/about')('About') },
// ])
export class App {

  todos:Todo[];

  constructor( private _todoService:TodoService ) {}

  ngOnInit() {
    this.getTodos();
  }

  getTodos() {
    this._todoService
      .getTodos()
      .then( todos => {
        this.todos = todos;
      })
  }
}



