import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ProductModel } from './productModel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiServer = "http://localhost:3000";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  // Create call to API for crerating a new product record in db
  create(product: ProductModel): Observable<ProductModel> {
    return this.httpClient.post<ProductModel>(this.apiServer + '/products/', JSON.stringify(product), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }  

  // Get Call to API for retrieving a product based on unique id from db
  getById(id: number): Observable<ProductModel> {
    return this.httpClient.get<ProductModel>(this.apiServer + '/products/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  // GetAll call to API for retrieving all products from db
  getAll(): Observable<ProductModel[]> {
    return this.httpClient.get<ProductModel[]>(this.apiServer + '/products/')
    .pipe(
      catchError(this.errorHandler)
    )
  }

  // update call to API for updating an existing record in db
  update(id: number, product: ProductModel): Observable<ProductModel> {
    return this.httpClient.put<ProductModel>(this.apiServer + '/products/' + id, JSON.stringify(product), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  // delete call to API for deleting a record from db
  delete(id: number){
    return this.httpClient.delete<ProductModel>(this.apiServer + '/products/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  errorHandler(error: any) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     console.log(errorMessage);
     return throwError(errorMessage);
  }
}
