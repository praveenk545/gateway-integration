import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginData, User } from '../models/auth.models';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';

export interface UserSign {
  isSignedIn: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user: User | undefined;
  private loggedIn = new BehaviorSubject<UserSign>({
    isSignedIn: localStorage.getItem('isSignedIn') === 'true',
  });
  get isLoggedIn(): Observable<UserSign> {
    return this.loggedIn.asObservable();
  }
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute
  ) {}

  /**
   * Performs the auth
   * @param email email of user
   * @param password password of user
   */
  login(user: any) {
    this.spinner.show();
    let query: any = this.route.snapshot.queryParams;
    let prem = new Promise((resolve, reject) => {
      if (user.email !== '' && user.password !== '') {
        //auth
        let token: string = btoa(user.email + ':' + user.password);
        let options: any = {};
        let head: HttpHeaders = new HttpHeaders({
          Authorization: 'Basic ' + token,
        });
        options.headers = head;
        this.http
          .get<any>(environment.API_URL + 'user/account/login', options)
          .subscribe(
            (data: any) => {
              if (data.statusCode == 200) {
                if (data.data) {
                  localStorage.setItem('access_token', data.token.access_token);
                  localStorage.setItem('isSignedIn', 'true');
                  localStorage.setItem('userData', JSON.stringify(data));
                  this.loggedIn.next({
                    isSignedIn: true,
                  });
                  this.setDefultApp(data.defultApp);
                  if (query.returnUrl) {
                    location.href = query.returnUrl;
                  } else {
                    location.href = '/dashboard';
                  }
                  //console.log('login data', data.data);
                  resolve(data);
                }
              } else {
                resolve(data);
              }
              this.spinner.hide();
            },
            (error: any) => {
              console.log(error);
              this.spinner.hide();
              reject(error);
            },
            () => {
              this.spinner.hide();
            }
          );
      }
    });
    return prem;
  }
  getUser() {
    let data: any = localStorage.getItem('userData');
    if (data) {
      data = JSON.parse(data);
      if (data && data.data) {
        data = data.data;
      }
    }
    return data;
  }
  /**
   * Performs the register
   * @param email email
   * @param password password
   */
  register(email: string, password: string) {}

  /**
   * Reset password
   * @param email email
   */
  resetPassword(email: string) {}
  getToken() {
    return localStorage.getItem('access_token');
  }
  getDefultApp() {
    try {
      let data: any = localStorage.getItem('defultApp');
      data = data ? JSON.parse(data) : {};
      return data;
    } catch (error) {
      return {};
    }
  }
  getApps() {
    try {
      let data: any = localStorage.getItem('userData');
      data = data ? JSON.parse(data) : {};
      data.apps = data.apps ? data.apps : [];
      return data.apps;
    } catch (error) {
      return [];
    }
  }
  logout() {
    this.loggedIn.next({ isSignedIn: false });
    localStorage.removeItem('access_token');
    localStorage.setItem('isSignedIn', 'false');
    localStorage.removeItem('userData');
    location.href = '/signin';
  }

  httpRequest(req: {
    url: string;
    method: string;
    data?: any;
    options?: any;
    loaderOff?: boolean;
    auth?: boolean;
  }): Promise<any> {
    let prem = new Promise((resolve, reject) => {
      if (!req.loaderOff) this.spinner.show();
      let { url, method, data, options } = req;
      //auth
      options = options ? options : {};
      if (req.auth) {
        let token = this.getToken();
        if (!token) {
          this.logout();
          if (!req.loaderOff) this.spinner.hide();
          reject({ ok: false });
        }
        let head: HttpHeaders = new HttpHeaders({
          Authorization: 'Bearer ' + token,
        });
        options.headers = head;
      }
      if (method == 'post') {
        this.http.post<any>(environment.API_URL + url, data, options).subscribe(
          (res: any) => {
            resolve(res);
          },
          (error: any) => {
            reject(error);
            if (!req.loaderOff) this.spinner.hide();
            if (
              !error.ok &&
              error.error &&
              (error.error.statusCode == 401 || error.error.statusCode == 403)
            ) {
              if (req.auth) this.logout();
            }
          },
          () => {
            if (!req.loaderOff) this.spinner.hide();
          }
        );
      } else if (method == 'get') {
        this.http.get<any>(environment.API_URL + url, options).subscribe(
          (res: any) => {
            resolve(res);
          },
          (error: any) => {
            reject(error);
            if (!req.loaderOff) this.spinner.hide();
            if (
              !error.ok &&
              error.error &&
              (error.error.statusCode == 401 || error.error.statusCode == 403)
            ) {
              if (req.auth) this.logout();
            }
          },
          () => {
            if (!req.loaderOff) this.spinner.hide();
          }
        );
      } else if (method == 'patch') {
        this.http
          .patch<any>(environment.API_URL + url, data, options)
          .subscribe(
            (res: any) => {
              resolve(res);
            },
            (error: any) => {
              reject(error);
              if (!req.loaderOff) this.spinner.hide();
              if (
                !error.ok &&
                error.error &&
                (error.error.statusCode == 401 || error.error.statusCode == 403)
              ) {
                if (req.auth) this.logout();
              }
            },
            () => {
              if (!req.loaderOff) this.spinner.hide();
            }
          );
      } else if (method == 'delete') {
        this.http.delete<any>(environment.API_URL + url, options).subscribe(
          (res: any) => {
            resolve(res);
          },
          (error: any) => {
            reject(error);
            if (!req.loaderOff) this.spinner.hide();
            if (
              !error.ok &&
              error.error &&
              (error.error.statusCode == 401 || error.error.statusCode == 403)
            ) {
              if (req.auth) this.logout();
            }
          },
          () => {
            if (!req.loaderOff) this.spinner.hide();
          }
        );
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
      .then((data) => {
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
      .catch((error) => {
        console.log('error', error);
      });
  }
  jsonDownload(
    filename: string,
    data: any,
    fileType: string = 'application/json'
  ) {
    try {
      const link = document.createElement('a');
      let file = JSON.stringify(data);
      let blobData = new Blob([file], { type: fileType });
      link.href = window.URL.createObjectURL(blobData);
      link.download = filename ? filename : '';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      this.showError('Something problem');
    }
  }
  slug(str: string) {
    let res: string = str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    return res;
  }
  showSuccess(message: string, title?: string) {
    this.toastr.success(message, title);
  }
  showError(message: string, title?: string) {
    this.toastr.error(message, title);
  }
  showWarning(message: string, title?: string) {
    this.toastr.warning(message, title);
  }
  sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  dateFormat(d: Date) {
    let month: any = d.getMonth() + 1;
    month = month <= 9 ? '0' + month : month;
    let date: any = d.getDate();
    date = date <= 9 ? '0' + date : date;
    let resDate = d.getFullYear() + '-' + month + '-' + date;
    return resDate;
  }
  getFilterDate() {
    let userData = this.getUser();
    let firstDate,
      lastDate = new Date();
    if (userData && userData.createAt) {
      firstDate = new Date(userData.createAt);
    }
    if (!firstDate) {
      let d = new Date();
      d.setMonth(d.getMonth() - 1);
      firstDate = d;
    }
    return { startDate: firstDate, endDate: lastDate };
  }
  setDefultApp(defultApp: any) {
    localStorage.setItem('defultApp', JSON.stringify(defultApp));
  }
}
