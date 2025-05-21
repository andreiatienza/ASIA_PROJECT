Sustainability Assessment Tool Dashboard Analytics
======================

Overview
--------
The Sustainability Assessment Tool is a web-based platform developed for Batangas State University (BSU) to evaluate, monitor, and promote sustainable development efforts aligned with the United Nations Sustainable Development Goals (SDGs). This tool offers interactive data visualizations, comprehensive summary cards, and detailed reports to assess the sustainability performance of various campuses and projects within BSU.
Users can explore progress across key sustainability indicators, identify areas needing improvement, and support data-driven decision-making to enhance BSU’s commitment to sustainable growth and social responsibility. By fostering transparency and collaboration, this tool empowers stakeholders—students, faculty, and administrators—to actively contribute toward achieving the SDGs in the university community.

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
