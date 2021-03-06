import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApolloClient, createNetworkInterface, IntrospectionFragmentMatcher, NetworkStatus } from 'apollo-client';
import { WatchQueryOptions } from 'apollo-client/core/watchQueryOptions';
import { Observable } from 'rxjs/Rx';

import { environment } from '../../environments/environment';

@Injectable()
export class ContentfulService {
  private client: ApolloClient;
  private event: { name: string };

  constructor(
    private http: HttpClient,
    private router: Router) { }

  private async getContentfulSchema(event): Promise<any> {
    console.log('getContentfulSchema');
    console.log( environment + ',' + event.name );
    return this.http.get(`${environment}/${event.name}/schema`).toPromise();
  }

  getEvent() {
    return this.event;
  }

  async getEventMetadata(name?: string): Promise<any> {
    const event = await this.http.get(`${environment.apiUrl}/event`,
      name && { params: new HttpParams().set('name', name) }).toPromise();
    return event;
  }

  async initialize(eventName?: string) {
    if (this.client) return;

    try {
      this.event = await this.getEventMetadata(eventName);
      const fragmentMatcher = new IntrospectionFragmentMatcher({
        introspectionQueryResultData: await this.getContentfulSchema(this.event)
      });

      this.client = new ApolloClient({
        networkInterface: createNetworkInterface({
          uri: `${environment.apiUrl}/en/${this.event.name}/graphql`
        }),
        fragmentMatcher
      });
    } catch (e) {
      this.router.navigate(['/']);
    }
  }

  async query<T>(options: WatchQueryOptions): Promise<{
    data: T;
    loading: boolean;
    networkStatus: NetworkStatus;
    stale: boolean;
  }> {
    if (!this.client) throw new Error(
      'Make sure that ContentfulService has been initialized before calling .query');
    return this.client.query<T>(options);
  }

  query$<T>(options: WatchQueryOptions): Observable<T> {
    return Observable.fromPromise<T>(this.query<T>(options)
      .then(result => result.data));
  }
}
