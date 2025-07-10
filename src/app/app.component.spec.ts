import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';

// Stub StoryList component
@Component({
  selector: 'app-story-list',
  template: '',
})
class StoryListStubComponent {}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        StoryListStubComponent, // ✅ Include stub for child component
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the AppComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should render heading with "Hacker News Stories"', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Hacker News Stories'
    );
  });

  it('should include app-story-list component', () => {
    const storyList = fixture.debugElement.query(By.css('app-story-list'));
    expect(storyList).toBeTruthy();
  });
});
