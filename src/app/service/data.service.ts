import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

function _window(): any {
  return window;
}
@Injectable({
  providedIn: 'root',
})
export class DataService {
  get nativeWindow(): any {
    return window;
  }
  constructor(private httpservice: HttpClient) {}
}
