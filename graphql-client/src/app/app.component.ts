import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  constructor(apollo: Apollo) {
    let customers = [];
    apollo.query({query: gql`
      query {
        customers {
          id
          name
        }
      }
    `
    }).subscribe((response => {
      console.log(response);
      this.customers = response.data.customers;
    }));
  }
}
