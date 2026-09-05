# MindNotes-dj

Live: https://mindnotes-dj.onrender.com/

A full-featured note-taking web application built with **Django** and **Django REST Framework**. MindNotes allows users to create, manage, and organize their notes with tags, featuring both a web interface and RESTful API endpoints.

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Models & Database](#models--database)
- [API Endpoints](#api-endpoints)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)

---

## ✨ Features

- **User Authentication**: Secure login and registration system using Django's built-in authentication
- **Note Management**: Create, read, update, and delete notes
- **Tag System**: Organize notes with multiple tags for better categorization
- **User-Specific Notes**: Each user can only view and manage their own notes
- **Responsive Web Interface**: Built with HTML, CSS, and JavaScript
- **RESTful API**: Full API support for programmatic access to notes
- **Modern UI**: Styled with Tailwind CSS for a clean, modern appearance
- **Database Persistence**: SQLite database for reliable data storage

---

## 🛠️ Technology Stack

### Backend
- **Django 6.0**: Web framework for building the application
- **Django REST Framework**: For building RESTful API endpoints
- **Python 3.x**: Core programming language (29.9% of codebase)
- **SQLite3**: Lightweight relational database (included with Django)

### Frontend
- **HTML5**: Markup structure (39.6% of codebase)
- **CSS3**: Styling and layout (10% of codebase)
- **JavaScript**: Client-side interactivity (20.5% of codebase)
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Django Templates**: Server-side template rendering

### Additional Tools
- **Django Tailwind**: Integration between Django and Tailwind CSS
- **Django Browser Reload**: Live reload during development
- **Django REST Framework Permissions**: Authentication and authorization

---

## 📁 Project Structure

```
MindNotes-dj/
├── MindNotes/                    # Main project directory
│   ├── MindNotes/               # Project settings & configuration
│   │   ├── settings.py          # Django settings
│   │   ├── urls.py              # URL routing configuration
│   │   ├── views.py             # Authentication views (login/register)
│   │   └── wsgi.py              # WSGI application
│   │
│   ├── notes/                   # Notes app (core functionality)
│   │   ├── models.py            # Database models
│   │   ├── views.py             # Web views
│   │   ├── urls.py              # URL patterns
│   │   ├── admin.py             # Django admin configuration
│   │   ├── forms.py             # Form definitions
│   │   ├── static/              # Static files for notes app
│   │   └── templates/           # HTML templates for notes
│   │
│   ├── api/                     # REST API app
│   │   ├── views.py             # API view classes
│   │   ├── urls.py              # API URL patterns
│   │   ├── serializers.py       # DRF serializers
│   │   ├── admin.py             # Admin configuration
│   │   └── models.py            # API-specific models
│   │
│   ├── theme/                   # Tailwind CSS theme app
│   │   ├── static/              # Compiled CSS
│   │   ├── static_src/          # Source CSS files
│   │   └── templates/           # Theme templates
│   │
│   ├── templates/               # Global templates
│   │   ├── auth/                # Authentication templates
│   │   └── layout.html          # Base layout template
│   │
│   ├── media/                   # User-uploaded files
│   ├── db.sqlite3              # SQLite database
│   └── manage.py               # Django management script
│
└── README.md                    # This file
```

---

## 🗄️ Models & Database

The application uses **Django ORM** with the following models:

### 1. **NotesModel**
Represents individual notes created by users.

```python
- id (Primary Key)
- user (ForeignKey to User) - Links note to the user who created it
- title (CharField) - Note title (max 100 characters)
- notes (CharField) - Note content
- tags (ManyToManyField) - Multiple tags for categorization
- date_time (DateTimeField) - Creation timestamp
- updated_time (DateTimeField) - Last update timestamp
```

### 2. **TagModel**
Represents tags for organizing notes.

```python
- id (Primary Key)
- name (CharField) - Tag name (max 50 characters)
```

### 3. **Profile**
Stores user profile information.

```python
- id (Primary Key)
- user (OneToOneField to User) - Links to Django User model
- avatar (ImageField) - User profile picture (optional)
```

### ORM Features Used
- **ForeignKey**: One-to-Many relationships (User → Notes)
- **OneToOneField**: One-to-One relationships (User → Profile)
- **ManyToManyField**: Many-to-Many relationships (Notes → Tags)
- **Auto timestamp fields**: Automatic date/time tracking
- **Query filtering**: Filter notes by user
- **Cascade deletion**: Remove notes when user is deleted

---

## 📡 API Endpoints

The application provides **2 main REST API endpoints** for note management:

### Authentication
- All endpoints require authentication (user must be logged in)
- Uses Django's built-in authentication system

### Endpoints

#### 1. **Notes List Endpoint**
- **URL**: `/api/notes/`
- **Methods**: 
  - `GET` - Retrieve all notes for the authenticated user (ordered by update time)
  - `POST` - Create a new note
- **Response Format**: JSON list of notes with serialized data

#### 2. **Notes Detail Endpoint**
- **URL**: `/api/notes/<int:pk>`
- **Methods**:
  - `GET` - Retrieve a specific note by ID
  - `PATCH` - Partially update a note (user-specific)
  - `DELETE` - Delete a note

### Serializer Fields
Notes are serialized with the following fields:
- `id` - Note identifier (read-only)
- `title` - Note title
- `notes` - Note content
- `date_time` - Creation time (read-only)
- `updated_time` - Last update time
- `tags` - Associated tags

### API Response Status Codes
- **200 OK** - Successful GET request
- **201 CREATED** - Note successfully created (POST)
- **202 ACCEPTED** - Note successfully updated (PATCH)
- **204 NO CONTENT** - Note successfully deleted (DELETE)
- **400 BAD REQUEST** - Invalid request data
- **401 UNAUTHORIZED** - User not authenticated

---

## Web Routes

### Authentication Routes
- `GET /` - Login page
- `POST /` - Handle login submission
- `GET /register/` - Registration page
- `POST /register/` - Handle registration

### Notes Routes
- `GET /notes/` - Display user's notes on home page (requires login)

---

## 🚀 Installation & Setup

### Prerequisites
- Python 3.x
- pip (Python package manager)
- Node.js and npm (for Tailwind CSS)

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/god-the-coder/MindNotes-dj.git
   cd MindNotes-dj/MindNotes
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv venv
   
   # Activate virtual environment
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Install Node.js dependencies** (for Tailwind CSS)
   ```bash
   npm install
   ```

5. **Run migrations**
   ```bash
   python manage.py migrate
   ```

6. **Create a superuser** (for admin access)
   ```bash
   python manage.py createsuperuser
   ```

7. **Build Tailwind CSS**
   ```bash
   python manage.py tailwind build
   ```

8. **Run the development server**
   ```bash
   python manage.py runserver
   ```

9. **Access the application**
   - Web Interface: `http://localhost:8000`
   - Admin Panel: `http://localhost:8000/admin`
   - API: `http://localhost:8000/api/notes/`

---

## 📝 Usage

### Creating a Note (Web Interface)
1. Register or login to your account
2. Navigate to the home page
3. Create a new note with title, content, and optional tags
4. Save your note

### Using the REST API

#### Get all notes
```bash
curl -H "Authorization: Token YOUR_TOKEN" http://localhost:8000/api/notes/
```

#### Create a note
```bash
curl -X POST http://localhost:8000/api/notes/ \
  -H "Content-Type: application/json" \
  -d '{"title": "My Note", "notes": "Note content", "tags": []}'
```

#### Update a note
```bash
curl -X PATCH http://localhost:8000/api/notes/1/ \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Title"}'
```

#### Delete a note
```bash
curl -X DELETE http://localhost:8000/api/notes/1/
```

---

## 👤 Author

**god-the-coder** - Full stack developer

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🤝 Contributing

Contributions are welcome! Feel free to submit a pull request with any improvements or bug fixes.

---

## 📞 Support

For issues, questions, or feedback, please open an issue on the GitHub repository.

---

**Happy Note Taking! 📝**
