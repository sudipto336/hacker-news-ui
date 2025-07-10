import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [FormsModule], // Required for ngModel
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should bind input value to query', () => {
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = 'Angular';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.query).toBe('Angular');
  });

  it('should emit search event on button click', () => {
    spyOn(component.search, 'emit');
    component.query = 'Test Search';
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();

    expect(component.search.emit).toHaveBeenCalledWith('Test Search');
  });

  it('should trim whitespace from the search query', () => {
    spyOn(component.search, 'emit');
    component.query = '   hello world   ';
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();

    expect(component.search.emit).toHaveBeenCalledWith('hello world');
  });
});
