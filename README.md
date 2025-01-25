# Simple Diabetes Management App

## Overview

The **Simple Diabetes Management App** is a personal web application designed to help individuals with diabetes track and manage their blood glucose levels. This app allows users to log their daily blood glucose readings, view a logbook of previous entries, and manage their account settings.

This app has different user roles, including unauthenticated users (unregistered visitors), authenticated users (users with valid accounts), and administrative users (app admins). The primary goal is to provide a smooth and user-friendly experience for diabetes management.

---

## Table of Contents

1. [User Roles](#user-roles)
2. [User Journeys](#user-journeys)
3. [User Stories](#user-stories)
4. [Project Setup](#project-setup)
5. [Features](#features)
6. [Technologies Used](#technologies-used)
7. [File Structure](#file-structure)
8. [Contributing](#contributing)

---

## User Roles

1. **Unregistered Users**: Visitors to the website who haven't signed up.
2. **Unauthenticated Users**: Users who have an account but aren’t currently logged in.
3. **Authenticated Users**: Users who have signed in and can use the full functionality of the app, such as viewing their logbook and managing their account.
4. **Admin Users**: Users with additional privileges like viewing/editing all users’ data (potentially for future enhancements).

---

## User Journeys

### Unregistered Users

- **Objective**: Create an account to start using the app.
  - View homepage with app details.
  - Fill out the registration form with necessary details.
  - Click the confirmation link sent via email (optional).
  - Access the dashboard after successful registration.

### Unauthenticated Users

- **Objective**: Log in to access their account and logbook.
  - View the login page.
  - Enter a valid email address and password.
  - Click "Login" and access the dashboard.
  - Option to reset password if forgotten.

### Authenticated Users

- **Objective**: Log their blood glucose levels and manage their settings.
  - Land on the dashboard after login.
  - Navigate to the logbook to view past entries.
  - Use the "Add Log" button to input a new blood glucose reading.
  - View or update account settings in the settings section.
  - Log out when done.

---

## User Stories

### Unregistered Users:

- **Story**: As an unregistered user, I want to register for an account so that I can use the app to manage my blood glucose levels.
  - **Acceptance Criteria**:
    1. Registration form collects the user’s email, password, and any other required details.
    2. The system sends a confirmation email (optional).
    3. After registration, the user is redirected to the dashboard.

### Unauthenticated Users:

- **Story**: As an unauthenticated user, I want to log in so that I can access my account.

  - **Acceptance Criteria**:
    1. User enters a valid email and password.
    2. System validates the credentials using bcrypt for password comparison.
    3. If valid, the user is redirected to their dashboard.

- **Story**: As an unauthenticated user, I want to reset my password in case I forget it.
  - **Acceptance Criteria**:
    1. User enters their email on the reset password page.
    2. System sends a password reset email.
    3. User follows the link to reset the password and can log in.

### Authenticated Users:

- **Story**: As an authenticated user, I want to log my blood glucose reading so that I can keep track of my glucose readings.

  - **Acceptance Criteria**:
    1. User clicks "Add Log" and enters a valid blood glucose reading.
    2. Reading is saved in the logbook with a timestamp.
    3. User can view this log later in the logbook section.

- **Story**: As an authenticated user, I want to update my account settings so that I can manage my profile.
  - **Acceptance Criteria**:
    1. User can update their email or password.
    2. Changes are saved and reflected in future logins.

---

## Project Setup

### Prerequisites

- **Node.js** and **npm** (Make sure both are installed)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/SadorDev/Simple-Diabetes.git
   cd diabetes-management-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

### Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

- `REACT_APP_API_URL`: Base URL for the backend
- `REACT_APP_SECRET_KEY`: Secret key for authentication (useful for JWT tokens)

---

## Features

1. **User Registration & Login**: Users can create an account, log in, and log out.
2. **Dashboard**: Pie chart that displays the BG readings within the last

   - 7 days
   - 14 days
   - 30 days
     Also a graph to display the average readings of the user

3. **Blood Glucose Log**: Authenticated users can log their blood glucose levels.
4. **Logbook**: View historical blood glucose readings with timestamps.
5. **Account Settings**: Manage personal information and change passwords.
6. **404 Page**: Handle invalid routes with a custom "Page Not Found" message.

---

## Technologies Used

- **Frontend**: Vite, React Router, Axios
- **Authentication**: Supabase
- **State Management**: React's Context API
- **Styling**: Styled-components
- **Forms**: React Hook Form for validation
- **Backend / Database**: Node.js/ Supabase (for storing user data and glucose logs)
- **Other tools**: React Icons, React Hot Toast, Recharts, date-fns

---

## File Structure

```
├── src
│   ├── authentication
│   │   ├── LoginForm.jsx
│   │   ├── Logout.jsx
│   │   ├── SignUpForm.jsx
│   │   ├── UpdatePasswordForm.jsx
│   │   ├── UpdateUserDataForm.jsx
│   │   ├── useLogin.js
│   │   └── useLogout.js
│   │   └── useAvatar.js
│   │   └── useSignUp.js
│   │   └── useUser.js
│   ├── dashboard
│   │      ├── DashboardFilter.jsx
│   │      └── DashboardLayout.jsx
│   ├── context
│   │      └── DarkModeContext.jsx
│   ├── logbook
│   │   └── LogbookRow.jsx
│   │   └── LogbookTable.jsx
│   ├── services
│   │   └── apiAuth.js
│   │   └── APILogbook.js
│   │   └── supabase.js
│   ├── pages
│   │   └── Account.jsx
│   │   └── Dashboard.jsx
│   │   └── Logbook.jsx
│   │   └── Login.jsx
│   │   └── PageNotFound.jsx
│   │   └── Settings.jsx
│   │   └── Users.jsx
│   ├── styles
│   │   └── GlobalStyles.js
│   ├── ui
│   │   │── AppLayout.jsx
│   │   ├── Button.jsx
│   │   ├── ButtonIcon.jsx
│   │   ├── Form.jsx
│   │   ├── FormRow.jsx
│   │   ├── FormRowVertical.jsx
│   │   ├── Header.jsx
│   │   ├── Heading.jsx
│   │   ├── Input.jsx
│   │   ├── Logo.jsx
│   │   ├── MainNav.jsx
│   │   ├── Menus.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Spinner.jsx
│   │   ├── SpinnerMini.jsx
│   │   ├── Table.jsx
│   └── App.jsx
│   └── main.jsx
└── ...
```

---

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Push to the branch (`git push origin feature-branch`).
5. Submit a pull request.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
