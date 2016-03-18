import { Component } from 'angular2/core';

@Component({
  selector: 'Footer',
  template: `
    <footer>
      <a [href]="url">Masatoshi Nishiguchi</a>
    </footer>
  `
})
export class Footer {
  url:string = "http://mnishiguchi.github.io";
}
