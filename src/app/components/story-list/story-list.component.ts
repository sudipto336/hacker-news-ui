import { Component, OnInit } from '@angular/core';
import { StoryService } from '../../services/story.service';
import { Story } from '../../models/story.model';

@Component({
  selector: 'app-story-list',
  standalone: false,
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.css'],
})
export class StoryListComponent implements OnInit {
  allStories: Story[] = [];
  filteredStories: Story[] = [];
  displayedStories: Story[] = [];

  loading = false;
  page = 1;
  pageSize = 20;
  query = '';

  constructor(private storyService: StoryService) {}

  ngOnInit(): void {
    this.fetchStories();
  }

  fetchStories(): void {
    this.loading = true;
    this.storyService.getStories().subscribe({
      next: (data) => {
        this.allStories = data;
        this.applyFilter();
        this.loading = false; // ✅ must be inside `next`, not `complete`
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  onSearch(query: string): void {
    this.query = query;
    this.page = 1;
    this.applyFilter();
  }

  applyFilter(): void {
    if (this.query) {
      const q = this.query.toLowerCase();
      this.filteredStories = this.allStories.filter((story) =>
        story.title?.toLowerCase().includes(q)
      );
    } else {
      this.filteredStories = [...this.allStories];
    }

    this.paginate();
  }

  paginate(): void {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.displayedStories = this.filteredStories.slice(start, end);
  }

  onNextPage(): void {
    const totalPages = Math.ceil(this.filteredStories.length / this.pageSize);
    if (this.page < totalPages) {
      this.page++;
      this.paginate();
    }
  }

  onPrevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.paginate();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.filteredStories.length / this.pageSize);
  }
}
