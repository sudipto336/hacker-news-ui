# Hacker News UI

A simple Angular application to display and search Hacker News stories.

## Features

- Fetches stories from a service
- Search functionality
- Pagination
- Loader indicator
- Responsive UI

## Getting Started

### Prerequisites

- Node.js (v16 or above recommended)
- Angular CLI (`npm install -g @angular/cli`)

### Installation

```sh
npm install
```

### Running the Application

```sh
ng serve
```

Open [http://localhost:4200](http://localhost:4200) in your browser.

### Running Tests

```sh
ng test
```

### Viewing Test Coverage

```sh
ng test --code-coverage
```

Open `coverage/hacker-news-ui/index.html` for the coverage report.

## Project Structure

- `src/app/components/loader` - Loader component
- `src/app/components/story-list` - Story list, search, and pagination
- `src/app/services/story.service.ts` - Story fetching logic
- `src/app/models/story.model.ts` - Story data model

## Contributing

Feel free to fork and submit pull requests.
