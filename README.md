# Employee-Tracker-App
Employee-Tracker-App
# Employee Tracker App

The Employee Tracker App is a command-line application designed to help businesses efficiently manage and track employee information. It provides a user-friendly interface for HR departments and managers to maintain records, track employee details, and generate reports. This README file provides an overview of the application and instructions for setting it up and running.

## Features

The Employee Tracker App offers the following features:

1. Employee Management: Add, update, and delete employee records including personal information, job details, and salary information.
2. Attendance Tracking: Track employees, add employees, view all roles, add a role, view salary, view 0r add departments in company.
3. Leave Management: Manage employee leave requests and keep track of approved and pending leaves.
4. Reports Generation: Generate various reports such as employee details, department details, and salary details.
5. User Authentication: Secure login system with role-based access control to protect sensitive employee data.

## Installation

To install and set up the Employee Tracker App, follow these steps:
Link: https://github.com/Valliebby/Employee-Tracker-App
1. Clone the repository: `git clone https://github.com/Valliebby/Employee-Tracker-App.git`
2. Navigate to the project directory: `cd Employee-Tracker-App`
3. Install the dependencies: `npm install`
4. Set up the database:
   - Create a new MySQL database.
   - Import the database schema using the provided SQL file (`database/schema.sql`).
5. Configure the environment variables:
   - Create a `.env` file in the project root.
   - Add the following environment variables to the file:
     ```
     DB_HOST=your_database_host
     DB_PORT=your_database_port
     DB_USER=your_database_username
     DB_PASSWORD=your_database_password
     DB_NAME=your_database_name
     ```
     Replace the placeholders with your actual database connection details.
6. Start the application: `npm start`
7. Access the application in your browser at `http://localhost:3000`.

## Technologies Used

The Employee Tracker App is built using the following technologies:

- seed: seed database.
- schema: A web application framework.
- MySQL: A popular relational database management system.
- Inquirer: please use npm i inquirer@8.2.4.



## Contributing

Contributions to the Employee Tracker App are welcome! If you find any bugs or have suggestions for improvement, please open an issue or submit a pull request.

## Acknowledgments

This project was inspired by the need for a comprehensive employee management system in modern businesses. We would like to thank all the contributors and the open-source community for their valuable efforts.



