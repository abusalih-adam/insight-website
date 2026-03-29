Ruya Academy full pack
======================

Files:
- academy.html  -> enrollment + immediate exam redirect + login
- exam.html     -> course-based exam page
- admin.html    -> enrollments, results, users, exam builder, approvals
- student.html  -> student dashboard

Flow:
Enroll -> exam -> admin review -> payment -> approval -> student dashboard

Important table names used:
- enrollments
- exams
- exam_results
- users

Assumed user columns:
- name
- email
- username
- password
- role
- approved
- payment_status
- level
- course

If any column name differs in your Supabase tables, rename it in the code to match your schema.
