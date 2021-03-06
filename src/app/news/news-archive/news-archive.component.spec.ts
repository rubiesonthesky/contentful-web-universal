import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsArchiveComponent } from './news-archive.component';
import { BaseComponent } from '../../content/base/base.component';
import { BlockEventInfoComponent } from '../../content-blocks/block-event-info/block-event-info.component';
import { BlockCountdownComponent } from '../../content-blocks/block-countdown/block-countdown.component';
import { BlockSponsorsComponent } from '../../content-blocks/block-sponsors/block-sponsors.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ContentfulService } from '../../core/contentful.service';
import { Observable } from 'rxjs/Observable';
import { WINDOW_PROVIDERS } from '../../core/window.service';

describe('NewsArchiveComponent', () => {
  let component: NewsArchiveComponent;
  let fixture: ComponentFixture<NewsArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ NewsArchiveComponent, BaseComponent, BlockCountdownComponent, BlockEventInfoComponent, BlockSponsorsComponent ],
      providers: [
        {
          provide: ContentfulService,
          useValue: { query$: () => Observable.of({ sponsors: [{}]}) }
        },
        WINDOW_PROVIDERS
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
