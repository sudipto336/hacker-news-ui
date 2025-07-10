import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoaderComponent } from './loader.component';
import { By } from '@angular/platform-browser';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the loader component', () => {
    expect(component).toBeTruthy();
  });

  it('should render a Bootstrap spinner', () => {
    const spinner = fixture.debugElement.query(By.css('.spinner-border'));
    expect(spinner).toBeTruthy();
    expect(spinner.attributes['role']).toBe('status');

    const hiddenText = fixture.debugElement.query(By.css('.visually-hidden'));
    expect(hiddenText.nativeElement.textContent).toContain('Loading...');
  });
});
