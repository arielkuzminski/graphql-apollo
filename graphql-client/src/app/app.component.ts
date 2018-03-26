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

  constructor(apollo: Apollo) {
    apollo.query({query: gql`
      query {
        customers {
          id
          name
        }
      }
    `
    }).subscribe((response => {
      const data: any = response.data;
      this.customers = data.customers;
    }));
  }
}
