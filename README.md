
My site acts as a sort of Twitter clone. The main difference is that users can only post pre-generated text in the form of number facts, life advice, and Chuck Norris jokes.

Users are required to make an account before accessing the website, and once they create their account, they unlock the ability to interact with the rest of the site. Upon logging into ones account, or upon making a new account, users will be directed to their profile page. Here, they are able to edit their account information, such as their username or display name. There is also the option to delete their account. There is a navbar on the top of the screen that can redirect them to different pages. On the feed page, a list of all generated posts will be shown, with the most recent posts being at the top. The following page will list the posts of users that they follow, and the likes page will show all the posts that have been liked. Users are also able to create a new post, which will bring them to a page with the options of getting any genre of post to make. Users can log out any time, and will be shown the signup/login page options once again.


Setup:
    You need 2 terminals open, one for frontend, and one for backend
    You will also need a .env file in both the main folder and in src/backend
    This needs a PGPASSWORD and a SECRET_KEY

    Backend-
        In one terminal, go into src/backend and run "npm install"
        Seed the database with "psql < facts.sql"
        Run the server with "nodemon server.js"

    Frontend-
        In the other terminal, run "npm install" in the main folder
        You may need to run "npm install --legacy-peer-deps" instead
        Run the server with "npm start"


Tests:
    Backend: run "npm test" while in the backend folder
    Frontend: run "npm test" while in the frontend folder



Database structure:

![capstone db](<capstone-db-schema.png>)

