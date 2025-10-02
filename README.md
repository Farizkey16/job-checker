**Apply Now: an AI-Powered Job Scam Detector**

----
**Problem Statement:**

There has been a lot of scams disguised as a job post. As an experienced Recruiter, it is easy for me to spot these fake job posts. However, not everyone might have the same trained eye as I do. Especially those who are desperate for job, and have limited resources in determining which job posts are real.

So I want to help by creating this. Despite just a simple AI-wrapper, I believe this might help a lot of people in the future, and save so many people from being scammed while looking for job.

**About the app:**

A web application designed to help jobseekers to avoid being scammed by a job post. Ensuring a safe applying experience.

This web application uses Gemini's Gemini AI, and enhanced to detect scam indicators such as:

1. Pre-interview payment request: asking for upfront cash or transfer for the entire application process,
2. Unprofessional language: job descriptions that contain typos, grammatical errors, misplaced capitalizations, or excessive use of informal language,
3. Improper scarcity: using phrases that creates a false sense of urgency,
4. Unrealistic promises: suspiciously high salary for positions that usually have market standards,
5. Suspicious contact methods: requesting to contact via non-formal line or using generic email such as @gmail or @yahoo instead of company's email,
6. Vague company identity: company name cannot be found anywhere, no Google search results, no websites, nothing.
7. Premature data request: asking for sensitive personal information way too early,
8. Unrealistic expectations: mismatch in salary vs effort, unrealistic hours, unrelated tasks
9. Extremely low wage: below minimum wage and unpaid internships

**Result shape:**
1. Each result will have their own score, closer to 0 means it's risky, closer to 100 means it's safe
2. There will be description made by Gemini, mentioning the scam indicators as well as the description and evidence

**Tech Stack & Architecture:**

_Frontend:_
Next.js, React, Tailwind CSS, Shadcn/UI

_Backend:_
Next.js API Routes

_Architecture:_

1. User submits a job post on the frontend text area,
2. Frontend makes an API call to /api/analyze
3. The route acts as a secure backend wrapper, it has already been equipped with detailed prompt and calls Google Gemini API
4. Gemini analyzes the text from frontend, returns a structured JSON. The backend also clean the JSON from any whitespace or any other characters outside JSON
5. The API route sends back the clean JSON for display in the frontend

**FUTURE IMPROVEMENTS:**
This v1 has so many limitations. But in the near future, improvements are in order and will focus on accuracy and cover more forms of job posts, not just text.

**FEEDBACK:**
I will always welcome a feedback, especially to help tons of people. You can send a feedback to my personal email farizky.priambudi@gmail.com

