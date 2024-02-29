import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

export interface UserSign {
  isSignedIn: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  showSuccess(arg0: string) {
    throw new Error('Method not implemented.');
  }
  showError(arg0: string) {
    throw new Error('Method not implemented.');
  }
  private loggedIn = new BehaviorSubject<UserSign>({
    isSignedIn: localStorage.getItem('isSignedIn') === 'true',
  });
  get isLoggedIn(): Observable<UserSign> {
    return this.loggedIn.asObservable();
  }
  constructor(
    private http: HttpClient,

    private route: ActivatedRoute
  ) {}

  httpRequest(req: {
    url: string;
    method: string;
    data?: any;
    options?: any;
    loaderOff?: boolean;
    auth?: boolean;
  }): Promise<any> {
    let prem = new Promise((resolve, reject) => {
      let { url, method, data, options } = req;
      //auth
      options = options ? options : {};
      if (req.auth) {
      }
      if (method == 'post') {
        this.http.post<any>(environment.API_URL + url, data, options).subscribe(
          (res: any) => {
            resolve(res);
          },
          (error: any) => {
            reject(error);

            if (
              !error.ok &&
              error.error &&
              (error.error.statusCode == 401 || error.error.statusCode == 403)
            ) {
            }
          },
          () => {}
        );
      } else if (method == 'get') {
      } else if (method == 'patch') {
      } else if (method == 'delete') {
      }
    });
    return prem;
  }

  httpAuthFileDownload(url: string, filePath: string) {
    this.httpRequest({
      url: url,
      method: 'get',
      options: { responseType: 'blob' as 'json', observe: 'response' },
      auth: true,
    })
      .then((data: any) => {
        if (data.body && data.body.size > 0) {
          var filename = filePath.split('/').pop();
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(data.body);
          link.download = filename ? filename : '';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          console.log('File is not found');
        }
      })
      .catch((error: any) => {
        console.log('error', error);
      });
  }
}
