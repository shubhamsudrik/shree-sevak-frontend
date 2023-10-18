import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { LoginService } from "../services/login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ) {
    let newReq = request;
    let token = this.loginService.getToken();
    console.log(token)
    console.log("INTERCEPTOR", token);
    if (token != null) {
      newReq = newReq.clone({
        setHeaders: {Authorization:`Bearer ${token}`},
        
       
      }
      );
      console.log(newReq);
    }
    return next.handle(newReq);
  }
}