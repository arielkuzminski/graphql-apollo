import { Customer } from './../types';
import { Apollo } from 'apollo-angular';
import { Component, OnInit, Query } from '@angular/core';
import gql from 'graphql-tag';

const addCustomer = gql`
  mutation submitRepository($name: String!, $email: String!, $age: Int!) {
    addCustomer(name: $name, email: $email, age: $age) {
      id
      name
    }
  }
`;

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  constructor(private apollo: Apollo) {}

  customer: Customer = {
    name: '',
    email: ''
  };

  ngOnInit() {}

  onSubmit() {
    console.log(this.customer);

    this.apollo
      .mutate({
        mutation: addCustomer,
        refetchQueries: [
          {
            query: gql`
              query {
                customers {
                  id
                  name
                }
              }
            `
          }
        ],
        variables: {
          name: this.customer.name,
          email: this.customer.email,
          age: Math.floor(Math.random() * 16) + 5
        }
      })
      .subscribe(
        ({ data }) => {
          console.log('got data', data);
        },
        error => {
          console.log(error);
        }
      );
  }
}
