import {
  Component,
  Input,
  Output,
  EventEmitter
} from 'angular2/core';

import { Item } from '../models/item.model';


/**
 * Define ItemsListComponent.
 * - Delegate events to the parent component.
 */
@Component({
  selector: 'ItemsList',
  template: `
    <div *ngFor="#item of items">
      <div>
        <h2>{{ item.name }}</h2>
      </div>
      <div>
        {{ item.description }}
      </div>
      <div>
        <button (click)="deleted.emit(item); $event.stopPropagation();">
          <i>close</i>
        </button>
      </div>
    </div>
  `
})
export class ItemsList {

  // Accept items array from the parent component.
  @Input() items: Item[];

  // Emit events so that they can be captured in the parent component.
  @Output() selected = new EventEmitter();
  @Output() deleted  = new EventEmitter();

} // end ItemListComponent


