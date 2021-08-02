import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryComponent } from './history/history.component';
import { AccountsComponent } from './accounts/accounts.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AuthGuard } from "./auth/auth.guard";
import { HeaderComponent } from './header/header.component';

const routes: Routes = [
  {path: "main", component: MainPageComponent, canActivate: [AuthGuard]},
  {path: "history", component: HistoryComponent, canActivate: [AuthGuard]},
  {path: "accounts", component: AccountsComponent, canActivate: [AuthGuard]},
  {path: "about-us", component: AboutUsComponent, canActivate: [AuthGuard]},
  {path: "profile", component: ProfileComponent, canActivate: [AuthGuard]},
  {path: "settings", component: SettingsComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: '/accounts', pathMatch: 'full'},
  {path: "sign-in", component: SignInComponent},
  {path: "sign-up", component: SignUpComponent},
  //{ path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
