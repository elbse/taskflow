# Taskflow — Team Task & Workload Manager

## Tech Stack
- Backend: Laravel [version], MySQL, Spatie Laravel Permission
- Frontend: React, Vite, MUI

## Architecture Decisions
- Used Spatie Laravel Permission exclusively for roles, rather than the `role` 
  column suggested in the original schema, to avoid the "custom role field 
  logic" the brief asked to avoid.
- Added a 5th endpoint (`GET /api/tasks`) beyond the four specified, since 
  the Admin dashboard view requires seeing all tasks — implied but not 
  explicitly listed in the API spec.
- [Add the "Add Employee" feature note — flag it as beyond brief scope]

## Known Limitations
- Task status is tracked per-task, not per-assignee — when a task has 
  multiple assignees, status reflects the task as a whole rather than 
  each person's individual progress. This matches the schema as specified 
  in the brief (`status` lives on `tasks`, not `task_user`).
