import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';

import { ContentBlockComponent } from '../content-block/content-block.component';
import { BlockCountdownComponent } from '../content-blocks/block-countdown/block-countdown.component';
import { BlockEventInfoComponent } from '../content-blocks/block-event-info/block-event-info.component';
import { BlockSponsorsComponent } from '../content-blocks/block-sponsors/block-sponsors.component';
import { ContentfulService } from '../core/contentful.service';
import { WINDOW_PROVIDERS } from '../core/window.service';
import { BaseComponent } from './base/base.component';
import { ContentComponent } from './content.component';

describe('ContentComponent', () => {
  let component: ContentComponent;
  let fixture: ComponentFixture<ContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [
        ContentBlockComponent,
        ContentComponent,
        BlockCountdownComponent,
        BlockEventInfoComponent,
        BlockSponsorsComponent,
        BaseComponent],
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
    fixture = TestBed.createComponent(ContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
