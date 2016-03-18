// Import Angular 2 decorators and services.
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from 'angular2/core';

import { Observable } from 'rxjs/Observable';
import { Store }      from '@ngrx/store';
// import { RouteConfig, Router } from 'angular2/router';

// Import Models.
import { Item } from './models/item.model';

// Import Services.
import { ItemsService } from './services/items.service';

// Import Store.
import { AppStore }     from './store';

// Import Components.
import { Header }     from './components/header.component';
import { ItemsList }  from './components/items-list.component';
import { ItemDetail } from './components/item-detail.component';
import { Footer }     from './components/footer.component';

/*
 * Define App component (Top Level Component)
 * - Has ItemsList and ItemDetail as children.
 * - Handles all the reducer events emitted from children.
 */
@Component({
  selector: 'app',
  pipes: [ ],
  providers: [ ItemsService ],
  directives: [
    Header,
    ItemsList,
    ItemDetail,
    Footer
   ],
  styles: [`
  `],
  template: `
    <Header></Header>

    <div>
      <ItemsList
        [items]="items | async"
        (selected)="handleSelectItem( $event )"
        (deleted)="handleDeleteItem( $event )">
      </ItemsList>
    </div>
    <div>
      <ItemDetail
        [item]="selectedItem | async"
        (saved)="handleSaveItem( $event )"
        (cancelled)="handleCancelItem( $event )">
      </ItemDetail>
    </div>

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

  items:Observable< Array< Item > >;
  selectedItem:Observable< Item >;

  /**
   * @param {ItemsService}    itemsService
   * @param {Store<AppStore>} store
   */
  constructor( private itemsService:ItemsService,
               private store:Store< AppStore > ) {

    // Bind to the items observable of the ItemsService.
    this.items        = itemsService.items;

    // Bind to the selectedItem observable of the AppStore.
    this.selectedItem = store.select( 'selectedItem' );

    // Log.
    this.selectedItem.subscribe( v => console.log( v ) );

    // Dispatch ADD_ITEMS action to the store, which in turn
    // updates the items.
    this.itemsService.loadItems();
  }

  ngOnInit() {}

  /**
   * Handle the "selected" event.
   * @param {Item} item
   */
  handleSelectItem( item:Item ) {

    this.store.dispatch({
      type:    'SELECT_ITEM',
      payload: item
    });
  }

  /**
   * Handle the "deleted" event.
   * @param {Item} item
   */
  handleDeleteItem( item:Item ) {

    // Notify the ItemsService instance of the event and let it delete the item.
    this.itemsService.deleteItem( item );
  }

  /**
   * Handle the "cancelled" event.
   */
  handleCancelItem() {
    this.resetItem();
  }

  /**
   * Handle the "saved" event.
   */
  handleSaveItem( item:Item ) {
    //
    this.itemsService.saveItem( item );
    this.resetItem();
  }

  /**
   * Reset the item form.
   */
  private resetItem() {

    // Create an empty item.
    let emptyItem:Item = {
      id:          null,
      name:        '',
      description: ''
    };

    // Dispatch the SELECT_ITEM action with an empty item.
    this.store.dispatch({
      type:    'SELECT_ITEM',
      payload: emptyItem
    });
  }

}



