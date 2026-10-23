# GradeBook — Client

React frontend of the GradeBook education platform. The API lives in [gradebook-server](https://github.com/ElvinBaxsh/gradebook-server).

## Features

- Login and registration, JWT stored in a Zustand auth store, protected routes
- **Dashboard:** grade summary, attendance chart, achievements, upcoming tests
- **Schedule:** calendar with day and week views (FullCalendar)
- **Tasks:** task list and assignment submission modal
- **Library** and **Videos** for learning materials
- Profile settings
- Sidebar layout, responsive design

## Tech Stack

React · Vite · React Router · Zustand · Axios · Tailwind CSS · FullCalendar · react-circular-progressbar · Lucide icons

## Getting Started

```bash
npm install
npm run dev     # http://localhost:5173
npm run build
```

The backend should run on `http://localhost:5000` (see [gradebook-server](https://github.com/ElvinBaxsh/gradebook-server)).
