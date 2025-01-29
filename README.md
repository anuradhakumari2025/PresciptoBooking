# Doctor Appointment Booking System

This project is a comprehensive Doctor Appointment Booking System with three dashboards: Admin, Doctor, and User. The system allows users to book and cancel appointments, make online payments using Razorpay, and update their profiles. Doctors and Admins can mark appointments as complete or cancel them.

## Features

### User Dashboard
- **Profile Management**: Users can update their profile information.
- **Appointment Booking**: Users can book appointments with doctors.
- **Appointment Cancellation**: Users can cancel their appointments.
- **Online Payment**: Users can pay for appointments online using Razorpay.

### Doctor Dashboard
- **Profile Management**: Doctors can update their profile information.
- **Appointment Management**: Doctors can view, complete, or cancel appointments.

### Admin Dashboard
- **Appointment Management**: Admins can view, complete, or cancel appointments.
- **Doctor Management**: Admins can add and manage doctor profiles.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/doctor-appointment-booking-system.git
2. Navigate to the project directory:
  - cd PresciptoBooking
3. Install dependencies for the frontend, backend, and admin:
  - cd frontend
 - npm install
 - cd ../backend
 - npm install
 - cd ../admin
 - npm install

4. Set up environment variables:

- Create a .env file in the frontend, backend, and admin directories.
- Add the necessary environment variables as specified in the .env.example files.

5. Start the development servers:
 - cd frontend
 - npm run dev
 - cd ../backend
 - npx nodemon
 - cd ../admin
 - npm run dev


## Usage
Access the User Dashboard at http://localhost:5173.
Access the Doctor Dashboard and Admin Dashboard at http://localhost:5174.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## License
This project is licensed under the MIT License.

 
