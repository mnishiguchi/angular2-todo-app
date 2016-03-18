import { Component } from 'angular2/core';

@Component({
  selector: 'Header',
  template: `
    <header>
      <nav>
        <h1>{{ title }}</h1>
      </nav>
    </header>
  `
})
export class Header {

  title:string = "My first angular2 ngrx app";

}
