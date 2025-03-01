# CausalFunnel - Shopify Survey App CausalFunnel is a Shopify app designed to collect customer feedback through a dynamic survey form on the Cart page and display the aggregated responses in an interactive admin dashboard. This project was developed as a demonstration of Shopify app development, integrating frontend (React with Polaris), backend (Node.js with Express), and MongoDB for data storage.\
## Objective Develop a Shopify app that: - Injects a dynamic survey form into the Cart page. - Captures and stores survey responses in MongoDB. - Provides an attractive, interactive dashboard in the app's admin panel for reviewing responses and performing data analysis. ## Key Features - **Survey Form:** A popup survey on the Cart page asking customer satisfaction questions. - **Data Storage:** Responses saved to MongoDB with shop-specific data. - **Admin Dashboard:** Displays total responses and a table of individual submissions using Shopify Polaris components. ## Tech Stack - **Frontend:** - React (with `@shopify/app-bridge-react` v2.0.7 for Shopify integration) - Shopify Polaris for UI components - **Backend:** - Node.js with Express - MongoDB (via Mongoose) for data storage - `shopify-api-node` for Shopify API interactions - `axios` for OAuth token retrieval - **Tunneling:** - Tunnelmole for exposing the local server to the internet (replacing ngrok to avoid warning pages) ## Project Structure`

CrauselFunnelNext/ ├── backend/ │ ├── config/ │ │ └── database.js # MongoDB connection setup │ ├── controllers/ │ │ ├── authController.js # OAuth and ScriptTag creation │ │ └── surveyController.js # Survey API logic │ ├── models/ │ │ ├── Shop.js # Shop schema (access token storage) │ │ └── SurveyResponse.js # Survey response schema │ ├── public/ │ │ └── survey.js # Frontend script for Cart page survey │ ├── routes/ │ │ ├── authRoutes.js # OAuth routes │ │ └── surveyRoutes.js # Survey API routes │ ├── .env # Environment variables │ └── index.js # Express server entry point ├── frontend/ │ ├── src/ │ │ ├── components/ │ │ │ ├── Dashboard.js # Admin dashboard component │ │ │ ├── SummaryCard.js # Total responses summary │ │ │ └── ResponseTable.js # Responses table │ │ └── App.js # App Bridge setup │ ├── .env # Frontend environment variables │ └── package.json # Frontend dependencies ├── README.md # Project documentation └── package.json # Backend dependencies


`## Prerequisites\
- **Node.js**: v18.x (LTS recommended; v22.13.1 may have compatibility issues with some tools).\
- **MongoDB Atlas**: A free-tier account for database hosting.\
- **Shopify Partners Account**: For app creation and testing.\
- **Tunnelmole**: For exposing the local server (alternative to ngrok).\
## Setup Instructions\
### Backend Setup\
1\. **Clone the Repository:**\
```bash\
git clone <repository-url>\
cd CrauselFunnelNext/backend`

1.  **Install Dependencies:**

    `npm install`

3.  **Configure Environment Variables:**
    -   Create a .env file in backend/:

        `PORT=8000 
        MONGO_URI=mongodb+srv://<username>:<password>@cluster0.nkeq4ce.mongodb.net/crausel_funnel?retryWrites=true&w=majority&appName=Cluster0\
        SHOPIFY_API_KEY=<your-shopify-api-key>\
        SHOPIFY_API_SECRET=<your-shopify-api-secret>\
        APP_URL=url generated from tunnelmole`

    -   Replace <username>, <password>, <your-shopify-api-key>, and <your-shopify-api-secret> with your credentials from MongoDB Atlas and Shopify Partners.

5.  **Run the Server:**

    -   Expected output: Server running on port 8000, MongoDB connected.

### Frontend Setup

1.  **Navigate to Frontend:**

    `cd ../frontend`

3.  **Install Dependencies:**

    `npm install`

5.  **Configure Environment Variables:**
    -   Create a .env file in frontend/:

        `REACT_APP_API_URL=/api REACT_APP_SHOPIFY_API_KEY=<your-shopify-api-key>`

    -   Use the same SHOPIFY_API_KEY as in the backend.

7.  **Build the Frontend:**


    `npm run build`

    -   This generates a build/ folder served by the backend.

### Tunneling Setup

1.  **Install Tunnelmole:**

    `npm install -g tunnelmole`

3.  **Run Tunnelmole:**

    `tmole 8000`

    -   URL: https://crausel-funnel.tunnelmole.net

    -   Update APP_URL in backend/.env and Shopify config if different.

### Shopify Configuration

1.  **Create Shopify App:**
    -   Log in to Shopify Partners.

    -   Create an app named Crausel-Funnel.

    -   Set:

        -   **App URL:** https://crausel-funnel.tunnelmole.net

        -   **Allowed Redirection URL(s):** https://crausel-funnel.tunnelmole.net/auth/callback

    -   Note the API key and secret.

3.  **Install on Test Store:**
    -   Visit:

        `https://crausel-funnel.tunnelmole.net/auth/install?shop=crausel-funnel.myshopify.com`

    -   Approve the app installation.

* * * * *

Usage
-----

1.  **Cart Page Survey:**
    -   Visit https://crausel-funnel.myshopify.com/cart.

    -   A centered popup survey appears with questions:

        -   "How satisfied are you with our service?" (1-5 rating)

        -   "Would you recommend us?" (Yes/No)

    -   Submit answers to save responses.

3.  **Admin Dashboard:**
    -   Access via Shopify admin > Apps > Crausel-Funnel.

    -   View total responses (SummaryCard) and a table of submissions (ResponseTable).

* * * * *

API Endpoints
-------------

-   **GET /api/survey/questions**
    -   Returns survey questions:

        `[ { "id": 1, "text": "How satisfied are you with our service?", "type": "rating", "options": [1, 2, 3, 4, 5] }, { "id": 2, "text": "Would you recommend us?", "type": "yesno", "options": ["Yes", "No"] } ]`

-   **POST /api/survey/submit**
    -   Body: { "shop": "crausel-funnel.myshopify.com", "responses": { "1": "3", "2": "Yes" } }

    -   Saves to MongoDB and returns { "message": "Survey submitted successfully" }.

-   **GET /api/survey/data** (Authenticated)

    -   Returns all survey responses for the shop.

* * * * *

Testing
-------

1.  **Run Locally:**
    -   Start server and Tunnelmole.

    -   Install app on a test store.

3.  **Submit Survey:**
    -   Add an item to cart, answer survey, and submit.

5.  **Check Data:**
    -   MongoDB Atlas: crausel_funnel > surveyresponses.

    -   Dashboard in Shopify admin.

* * * * *

Troubleshooting
---------------

-   **Form Not Visible:**
    -   Check console logs: Survey form appended to body.

    -   Inspect DOM for <form id="survey-form">.

    -   Adjust popup styling in survey.js.

-   **API Returns HTML:**
    -   Ensure Tunnelmole is running; avoid ngrok free tier.

-   **Tunnel Stops:**
    -   Use while true; do curl <tunnel-url>; sleep 300; done to keep alive.

* * * * *