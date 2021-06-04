import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedInGuard implements CanActivate {

  constructor(private storages: StorageService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    // Here we can forbidden the route if user is not known
    // and redirect him to the Login/Registration page
    return !!this.storages.get('token');
  }

}
