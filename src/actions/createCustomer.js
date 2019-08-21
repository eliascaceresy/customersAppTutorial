import { createAction } from "redux-actions";
import { CREATE_CUSTOMER } from "../constants";
import { apiPost } from "../api";
import { urlCustomers } from "../api/urls";

export const createCustomer = createAction(CREATE_CUSTOMER, customer =>
  apiPost(urlCustomers, customer)()
);
