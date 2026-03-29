Ruya Academy full pack
======================

Files:
- index.html       -> public Ruya home page
- academy.html     -> public academy, registration form, and automatic exam redirect
- exam.html        -> course-based exam page
- admin.html       -> enrollments, results, users, approvals, and exam builder
- student.html     -> private student dashboard
- dashboard.html   -> hub page for the Ruya ecosystem
- shared.js        -> shared Supabase helpers and utilities
- styles.css       -> shared visual system
- supabase.sql     -> suggested database schema
- README.txt       -> this file

Flow:
Register -> exam -> admin review -> payment -> approval -> student dashboard

Notes:
- The pack uses the Supabase project URL and anon key already present in the site files.
- If your live schema uses slightly different names, rename the table/column references in shared.js and the pages.
- The pack keeps the UI clean and simple on the public academy page, with a private classroom for approved students.
