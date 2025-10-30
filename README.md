# Subscription CPR

Subscription CPR is a simple app to track your subscriptions, get reminders before renewal, and help you cancel "zombie" subscriptions.

## Setup Instructions

### Backend

1.  Navigate to the `backend` directory: `cd backend`
2.  Install dependencies: `npm install`
3.  Start the server: `npm start`

The backend will be running on `http://localhost:5000`.

### Frontend

1.  Navigate to the `frontend` directory: `cd frontend`
2.  Install dependencies: `npm install`
3.  Start the React app: `npm start`

The frontend will be running on `http://localhost:3000`.

## Environment Variables

There are no required environment variables for the MVP, but for a production environment, you should set the following in the `backend` directory in a `.env` file:

*   `PORT`: The port for the server to run on (defaults to 5000).
*   `JWT_SECRET`: A secret key for signing JWTs.

## Product Summary

*   **Target Users**: Anyone who has multiple subscriptions and wants to better manage their recurring expenses.
*   **Daily Use Case**: Users can add new subscriptions as they sign up for them, and the app will provide a clear overview of all their subscriptions in one place.
*   **Monetization Ideas**:
    *   Freemium model with a limit on the number of subscriptions you can track for free.
    *   Premium features like automated subscription cancellation or finding better deals on subscriptions.
*   **Next-Step Features**:
    1.  **Email/Push Notifications**: Remind users a few days before a subscription is about to renew.
    2.  **Spending Analytics**: Show users how much they're spending on subscriptions each month and year.

