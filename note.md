Backend

- User model - add more data
- Passwords should be encrypted with bcrypt
- Registration endpoint for new users
- Sign-in endpoint
- Endpoint that will return some info for the logged in user /my-page (Should be displayed when logged in)
- Authenticated endpoint should return a 401 or 403 with an error message if you try to access it without a token or with an invalid token
- Validate the user input when creating a new user, and return error messages which could be shown by the frontend

Frontend

- Build a registration form that will POST to the API. Store the access token in the local storage. (Use token when making other requests)
- A sign-in form
- A page to show the authenticated content from the API
- A 'Sign out' button that removes the saved access token and redirects the user to the login form

// Components (Frida)

- Top menu header
- Registration form
- Login form
- Button (sign in and sign out) (Frida)
- Page with logged-in content
  STYLED COMPONENTS

// Endpoints

- login
- logout
  ✅ - registration (/users)
- my-page

// Registration form (all required) (Pernilla)

- username (unique)
- fname (parent)
- lname (parent)
- age
- email (unique) (parent)
- password
- password (double check the password)
- btn - register

// Login form (all required) (Katarina)

- email / username (unique)
- password
- btn - sign in
