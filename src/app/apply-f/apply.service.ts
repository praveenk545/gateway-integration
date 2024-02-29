import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApplyService implements OnInit {
  constructor(private http: HttpClient, private service: ApplyService) {}
  ngOnInit(): void {}
}
