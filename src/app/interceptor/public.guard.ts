import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PublicGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(): boolean {

    if (this.getData()) {
     this.router.navigate(['/assignment']);
     return true;
    }
    this.router.navigate(['']);
    return false;
  }

  getData(): any {
    const asd = JSON.parse(localStorage.getItem('auth'));
    // @ts-ignore
    if (asd === null) {
      return false;
    }
    debugger
    return true;
  }

}
