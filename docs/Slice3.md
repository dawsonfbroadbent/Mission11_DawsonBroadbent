Mission #13 Assignment
IS 413 - Hilton
Continuing the Bookstore app from Mission #12, create a new Git branch for
Phase #6.
Add the ability for the user to add, delete, and update books in the database.
Deploy the app to Azure.
NOTE: In order for the TAs to be able to navigate to your admin page, we need to
add a file on the front end. Remember that React is an SPA (Single Page
Application), so if we try to type in something like “/adminbooks” after the URL,
it will try to take the user to a different URL, rather than staying on the same page
and going to a different React route. In order to fix that, we add a file in the
“public” folder in React named “routes.json”, and then add the following code:
{
"routes": [
{
"route": "/*",
"serve": "/index.html",
"statusCode": 200
}
]
}
That will change the program so that routes like “/adminbooks” that come after the
URL will keep the same page, but use the React route instead.
Submit the link to your deployed website via Learning Suite. (If you did not
deploy the website, submit your GitHub link.)


App Compiles and Runs Without Error
Performance levels:	Score:
Yes	10
App compiles and runs without crashing or giving other errors.
No	0
App has some issue that is causing it to break.
Ability to Add Books
Performance levels:	Score:
Yes	20
The user has the ability to add new books to the database.
Partial	10
There are issues with adding books to the database.
No	0
The app does not give the ability to add books to the database.
Ability to Edit Books
Performance levels:	Score:
Yes	20
The user has the ability to edit books in the database.
Partial	10
There are issues with editing books in the database.
No	0
The app does not give the ability to edit books in the database.
Ability to Delete Books
Performance levels:	Score:
Yes	20
The user has the ability to delete books from the database.
Partial	10
There are issues with deleting books from the database.
No	0
The app does not give the ability to delete books from the database.
App Deployed on Azure
Code is Clean
Performance levels:	Score:
Yes	10
Good readability, commending, line spacing, etc.
Partial	5
Missing commenting or other readability issues.
No	0
Code is difficult to understand or read.