import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {map, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient) { }

  get(apiPath: string): Observable<any[]>{
    return this.http.get(apiPath).pipe(
      catchError(this.handleError),
      resp => resp
    )
  }

  put(item: any, apiPath: string): Observable<any>{
    return this.http.put(apiPath, item).pipe(
      catchError(this.handleError),
      map(() => item)
    )
  }

  delete(apiPath: string): Observable<any>{
    return this.http.delete(apiPath).pipe(
      catchError(this.handleError),
      map(() => null)
    )
  }

  post(item: any, apiPath: string): Observable<any>{
    return this.http.post(apiPath, item).pipe(
      catchError(this.handleError),
      resp => resp
    )
  }

  private handleError(error: any): Observable<any>{
    console.log('ERRO NA REQUISIÇÃO', error);
    return throwError(() => error)
  }
}
