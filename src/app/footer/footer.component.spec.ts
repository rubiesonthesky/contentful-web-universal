import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FooterComponent } from './footer.component';
import { SocialMediaComponent } from '../social-media/social-media.component';
import { ContentfulService } from '../core/contentful.service';
import { Observable } from 'rxjs/Observable';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ FooterComponent, SocialMediaComponent ],
      providers: [
        {
          provide: ContentfulService,
          useValue: { query$: () => Observable.of({ menus: [{}] }) }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
