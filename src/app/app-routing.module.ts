import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApiClientResolve } from './api-client.resolve';
import { ContentResolve } from './content.resolve';
import { ContentComponent } from './content/content.component';
import { EventResolve } from './event.resolve';
import { EventComponent } from './event/event.component';
import { NewsArchiveComponent } from './news/news-archive/news-archive.component';
import { NewsArticleResolve } from './news/news-article.resolve';
import { NewsArticleComponent } from './news/news-article/news-article.component';
import { SkeletorComponent } from './skeletor/skeletor.component';
import { SponsorsPageComponent } from './sponsors-page/sponsors-page.component';

const routes: Routes = [
  // If no event is specified, we will load default event.
  {
    path: '',
    resolve: { event: EventResolve },
    component: EventComponent
  },
  // If the event is known, we will load the page.
  {
    path: ':event',
    component: SkeletorComponent,
    resolve: {
      apiClient: ApiClientResolve,
      event: EventResolve
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ContentComponent,
        resolve: {
          content: ContentResolve
        }
      },
      {
        path: 'news',
        children: [
          {
            path: '',
            component: NewsArchiveComponent,
            resolve: {
              articles: NewsArticleResolve
            }
          },
          {
            path: ':article',
            component: NewsArticleComponent,
            resolve: {
              article: NewsArticleResolve
            }
          }
        ]
      },
      {
        path: 'partners',
        component: SponsorsPageComponent
      },
      {
        path: 'sponsors',
        pathMatch: 'full',
        redirectTo: 'partners'
      },
      {
        path: '**',
        component: ContentComponent,
        resolve: {
          content: ContentResolve
        }
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  providers: [
    EventResolve,
    ApiClientResolve,
    ContentResolve
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
