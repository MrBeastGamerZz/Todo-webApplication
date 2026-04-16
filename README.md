# Todo List App — Django

A task management web application built with **Python** and the **Django** framework.  
Users can create, view, update, and delete tasks through a clean web interface.

> **Course project** — Built as part of a 5th Semester(Sep 2024 to Dec 2024) Django coursework module.  
> Base project adapted from [larymak/ToDo-list-App](https://github.com/larymak/ToDo-list-App).  
> Extended with additional features and improvements by the contributors below.

---


## Features

- Add new tasks with a title and description
- View all tasks on the home page
- Edit / update existing tasks
- Delete tasks with a confirmation step
- Django admin panel for managing data
- SQLite database (no extra setup needed)

---

## Tech Stack

| Layer      | Technology          |
|------------|---------------------|
| Language   | Python 3.x          |
| Framework  | Django 4.x          |
| Database   | SQLite3             |
| Frontend   | HTML, CSS           |
| Templating | Django Templates    |

---

## Project Structure

```
ToDo-list-App/
│
├── manage.py               # Django CLI entry point
├── requirements.txt        # Python dependencies
├── db.sqlite3              # SQLite database (auto-generated)
│
├── todoApp/                # Project config folder
│   ├── settings.py         # Project settings
│   ├── urls.py             # Root URL router
│   ├── wsgi.py             # WSGI deployment entry
│   └── asgi.py             # ASGI deployment entry
│
└── tasks/                  # Main app — all todo logic lives here
    ├── models.py           # Task database model
    ├── views.py            # Business logic (CRUD operations)
    ├── urls.py             # App-level URL patterns
    ├── forms.py            # Django forms for create/edit
    ├── admin.py            # Admin panel registration
    ├── tests.py            # Unit tests
    │
    ├── migrations/         # Auto-generated database migrations
    │   └── 0001_initial.py
    │
    └── templates/
        └── tasks/
            ├── task_list.html            # Home page — all tasks
            ├── task_create.html          # Add new task form
            ├── task_update.html          # Edit task form
            └── task_confirm_delete.html  # Delete confirmation page
```

---

## CRUD Operations

This project demonstrates all four CRUD operations using Django:

| Operation | URL              | Description                  |
|-----------|------------------|------------------------------|
| Create    | `/tasks/create/` | Add a new task               |
| Read      | `/tasks/`        | View all tasks               |
| Update    | `/tasks/<id>/update/` | Edit an existing task   |
| Delete    | `/tasks/<id>/delete/` | Remove a task           |

---

## What I Learned

- Setting up a Django project and understanding its folder structure
- Creating database models and running migrations
- Building views using Django's function-based and class-based views
- Connecting URLs to views using `urls.py`
- Rendering data in HTML templates using Django's template language
- Handling forms for user input with validation
- Using the Django admin panel for data management
- Performing full CRUD operations with Django ORM

---

## Acknowledgements

- Base project: [larymak/ToDo-list-App](https://github.com/larymak/ToDo-list-App) by Hillary Nyakundi
- Built using the [Django](https://www.djangoproject.com/) web framework

---

## Contributors

| Name |
|------|
| C B RAJAVARMAN  | 
| G MANUNANDAN  | 
| MANJUNATHA REDDY N  | 


