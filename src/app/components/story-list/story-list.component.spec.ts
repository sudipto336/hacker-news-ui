import {
  ComponentFixture,
  discardPeriodicTasks,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { StoryListComponent } from './story-list.component';
import { StoryService } from '../../services/story.service';
import { delay, Observable, of } from 'rxjs';
import { Story } from '../../models/story.model';
import { SearchComponent } from '../search/search.component';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from '../loader/loader.component';

describe('StoryListComponent', () => {
  let component: StoryListComponent;
  let fixture: ComponentFixture<StoryListComponent>;
  let mockStoryService: jasmine.SpyObj<StoryService>;

  const mockStories: Story[] = [
    { id: 1, title: 'Angular', url: 'https://angular.io' },
    { id: 2, title: 'React', url: 'https://reactjs.org' },
    { id: 3, title: 'Vue', url: null },
  ];

  beforeEach(async () => {
    mockStoryService = jasmine.createSpyObj('StoryService', ['getStories']);
    await TestBed.configureTestingModule({
      declarations: [StoryListComponent, SearchComponent, LoaderComponent],
      providers: [{ provide: StoryService, useValue: mockStoryService }],
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(StoryListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch stories and set loading', fakeAsync(() => {
    mockStoryService.getStories.and.returnValue(of(mockStories));

    component.fetchStories();

    fixture.detectChanges(); // Let Angular process change detection

    expect(component.allStories.length).toBe(3);
    expect(component.loading).toBeFalse();
  }));

  it('should handle error and set loading to false', () => {
    mockStoryService.getStories.and.returnValue(
      // simulate an error from observable
      new Observable(() => {
        throw new Error('Network error');
      })
    );

    component.fetchStories();

    expect(component.loading).toBeFalse(); // ✅ loading should still be false
    expect(component.allStories.length).toBe(0); // No stories should be loaded
  });

  it('should filter stories by query', () => {
    component.allStories = mockStories;
    component.onSearch('React');
    expect(component.filteredStories.length).toBe(1);
    expect(component.filteredStories[0].title).toBe('React');
  });

  it('should reset filter if query is empty', () => {
    component.allStories = mockStories;
    component.onSearch('');
    expect(component.filteredStories.length).toBe(3);
  });

  it('should paginate stories', () => {
    component.filteredStories = mockStories;
    component.pageSize = 2;
    component.page = 1;
    component.paginate();
    expect(component.displayedStories.length).toBe(2);
    expect(component.displayedStories[0].title).toBe('Angular');
    expect(component.displayedStories[1].title).toBe('React');
  });

  it('should go to next page', () => {
    component.filteredStories = mockStories;
    component.pageSize = 2;
    component.page = 1;
    component.onNextPage();
    expect(component.page).toBe(2);
    expect(component.displayedStories.length).toBe(1);
    expect(component.displayedStories[0].title).toBe('Vue');
  });

  it('should not go to next page if on last page', () => {
    component.filteredStories = mockStories;
    component.pageSize = 2;
    component.page = 2;
    component.onNextPage();
    expect(component.page).toBe(2);
  });

  it('should go to previous page', () => {
    component.filteredStories = mockStories;
    component.pageSize = 2;
    component.page = 2;
    component.onPrevPage();
    expect(component.page).toBe(1);
    expect(component.displayedStories.length).toBe(2);
  });

  it('should not go to previous page if on first page', () => {
    component.filteredStories = mockStories;
    component.pageSize = 2;
    component.page = 1;
    component.onPrevPage();
    expect(component.page).toBe(1);
  });

  it('should calculate totalPages correctly', () => {
    component.filteredStories = mockStories;
    component.pageSize = 2;
    expect(component.totalPages).toBe(2);
  });

  it('should handle empty stories', () => {
    component.allStories = [];
    component.onSearch('');
    expect(component.filteredStories.length).toBe(0);
    expect(component.displayedStories.length).toBe(0);
    expect(component.totalPages).toBe(0);
  });

  it('should filter stories with undefined title safely', () => {
    component.allStories = [
      ...mockStories,
      { id: 4, title: undefined, url: null },
    ];
    component.onSearch('Angular');
    expect(component.filteredStories.length).toBe(1);
  });
});
