SDG Dashboard Analytics
======================

Overview
--------
The SDG Dashboard Analytics is a web-based tool designed to visualize and analyze data related to the United Nations Sustainable Development Goals (SDGs) across multiple campuses and projects. It provides interactive charts, summary cards, and detailed tables to help users monitor progress, compare performance, and identify trends in SDG-related initiatives.

Dataset Used
------------
- The dataset used is from the Capstone Project, containing:
  - SDG information (sdg_ID, sdg_number, sdg_name, description)
  - Participation records (paricipation_id, policy_research_count, campus, total_points, created_at, created_year, sdg_ID)
  - Participation content (participation_content_id, title_ppa, description, total_cost, fund_source, campus, created_at, created_year, participation_id, sdg_ID)
- The data is stored in a MySQL database and accessed via backend API endpoints.

Instructions to Install and Run
------------------------------
1. **Clone the repository** (or copy the project files to your local machine).
2. **Install dependencies**:
   - Open a terminal in the project root directory.
   - Run `npm install` in the `backend` folder to install backend dependencies.
3. **Configure the database**:
   - Ensure you have MySQL installed and running.
   - Import the provided SQL schema and data into your MySQL server.
   - Update the database connection settings in `backend/config/db.js` if needed.
4. **Start the backend server**:
   - In the `backend` folder, run: `node server.js`
   - The backend API will be available at `http://localhost:3000`
5. **Open the frontend**:
   - Open `localhost:3000` in your web browser.
   - The dashboard will connect to the backend API running on `localhost:3000`.

Dependencies List
-----------------
**Backend:**
- express
- mysql2
- cors
- body-parser

**Frontend:**
- Bootstrap 5 (via CDN)
- Chart.js (via CDN)
- Bootstrap Icons (via CDN)

**Other Requirements:**
- Node.js (for backend)
- MySQL (for database)

**Note:**
- The application is designed to run locally at `http://localhost:3000` for API requests.
- Make sure your MySQL server is running and accessible before starting the backend.

For more details, see the API Documentation file included in this project. 