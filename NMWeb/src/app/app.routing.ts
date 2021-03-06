import { Routes, RouterModule } from '@angular/router';
import { PreloadAllModules } from '@angular/router';
import {UserGroupsComponent} from './user-groups/user-groups.component'
import {TopicsListComponent} from './topics-list/topics-list.component'
import {TermsOfServiceComponent} from './terms-of-service/terms-of-service.component'
import {PrivacyPolicyComponent} from './privacy-policy/privacy-policy.component'
import {UserListComponent} from './user-list/user-list.component'
import {TopicsMapPageComponent} from './topics-map-page/topics-map-page.component'
import {TOPIC_ID_PARAM} from "./shared/routes";
import {LoginComponent} from "./login/login.component";

const appRoutes: Routes = [
  {
    path: '',
    loadChildren: 'app/landing-page/landing-page.module#LandingPageModule',
  },
  {
    path: 'people-list',
    component: UserListComponent,
  },
  {
    path: 'topics',
    component: TopicsListComponent,
  },
  {
    path: 'groups',
    component: UserGroupsComponent,
  },
  {
    path: 'about',
    loadChildren: 'app/about/about.module#AboutModule',
  },
  {
    path: 'topic/:' + TOPIC_ID_PARAM,
    loadChildren: 'app/topic-details/topic-details.module#TopicDetailsModule',
  },
  {
    path: 'terms',
    component: TermsOfServiceComponent,
  },
  {
    path: 'profile',
    loadChildren: 'app/user-profile-details/user-profile-details.module#UserProfileDetailsModule',
  },
  {
    path: 'config',
    loadChildren: 'app/user-config/user-config.module#UserConfigModule',
  },
  {
    path: 'user', /* workaround to support older urls which were /user/<user-id> */
    redirectTo: 'u',
  },
  {
    path: 'u',
    loadChildren: 'app/user-profile-details/user-profile-details.module#UserProfileDetailsModule',
  },
  {
    path: 'privacy',
    component: PrivacyPolicyComponent,
  },
  {
    path: 'topics-map',
    component: TopicsMapPageComponent
    //loadChildren: 'app/topics-map-page/topics-map-page.module#TopicsMapPageComponent'
  },
  {
    path: '**',
    redirectTo: '',
  },

];


export const routingModule = RouterModule.forRoot(
  appRoutes,
  { preloadingStrategy: PreloadAllModules }
);
