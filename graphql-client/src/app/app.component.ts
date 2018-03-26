import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Customer } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  customers = [];

  constructor(private apollo: Apollo) {
    this.apollo.watchQuery<any>({query: gql`
      query {
        customers {
          id
          name
        }
      }
    `}).valueChanges.subscribe(( { data, loading }) => {
      this.customers = data.customers;
    })
  }
}
