# Product Requirements Document (PRD)

# Saudi Interview Coach

## 1. Overview

Saudi Interview Coach is an AI-powered web application that helps students, fresh graduates, and cooperative training applicants practice job interviews for Saudi companies.

The application uses an LLM API to simulate an interview experience. The user enters basic information such as major, target role, company type, experience level, and preferred interview language. Then, the AI generates realistic interview questions, evaluates the user's answers, gives a score, provides feedback, and suggests an improved answer.

The goal of the project is to help users improve their interview confidence and learn how to answer questions professionally.

---

## 2. Problem Statement

Many students and fresh graduates struggle with job interviews because they do not know how to structure their answers clearly and professionally.

Some users may have good skills and projects, but they do not know how to explain them in an interview. They may also feel nervous because they do not have enough practice.

Saudi Interview Coach solves this problem by allowing users to practice interviews with AI and receive instant feedback.

---

## 3. Target Users

The main target users are:

- University students
- Fresh graduates
- Cooperative training applicants
- Job seekers in Saudi Arabia
- Students preparing for internship interviews
- Users applying to Saudi companies, banks, government sectors, or tech companies

---

## 4. Goals

The main goals of the application are:

1. Help users practice job interviews in a simple way.
2. Generate realistic interview questions based on the user's profile.
3. Evaluate user answers using AI.
4. Provide clear feedback and improvement tips.
5. Suggest better answers to help users learn.
6. Support both Arabic and English interview practice.

---

## 5. Main Features

### 5.1 Interview Setup

The user enters basic information before starting the interview.

User inputs:

- Name
- Major
- Target role
- Company type
- Experience level
- Interview language

Example:

```text
Name: Turki
Major: Computer Science
Target Role: Software Developer Intern
Company Type: Saudi Technology Company
Experience Level: Student
Interview Language: English
```

---

### 5.2 AI Question Generation

The AI generates interview questions based on the user's information.

Example question:

```text
Tell me about yourself and why you are interested in this internship.
```

The questions should match the user's major, role, and experience level.

---

### 5.3 User Answer Submission

The user writes an answer to the AI-generated interview question.

Example user answer:

```text
I am a computer science student and I like programming. I want to learn more and improve my skills.
```

---

### 5.4 AI Answer Evaluation

The AI evaluates the user's answer and returns:

- Score from 1 to 10
- Feedback
- Improved answer
- Tips for the next answer

Example output:

```text
Score: 6/10

Feedback:
Your answer is clear, but it is too general. You should mention your major, skills, projects, and career goal.

Improved Answer:
I am a Computer Science student with an interest in software development. I have worked on academic projects using Java and web technologies, and I am looking for an internship where I can apply my technical skills in a real work environment.

Tip:
Try to connect your answer to the target role and mention one project or skill.
```

---

### 5.5 Continue to Next Question

After receiving feedback, the user can continue to the next question.

The app can repeat the process:

```text
AI asks question → User answers → AI gives feedback → Next question
```

---

## 6. User Flow

1. User opens the application.
2. User clicks "Start Interview".
3. User fills in interview setup information.
4. User clicks "Start AI Interview".
5. AI generates the first interview question.
6. User writes an answer.
7. User clicks "Submit Answer".
8. AI evaluates the answer.
9. App displays the score, feedback, improved answer, and tips.
10. User clicks "Next Question" to continue practicing.

---

## 7. Pages

### 7.1 Home Page

Purpose:

Introduce the application and allow the user to start.

Content:

- App name: Saudi Interview Coach
- Short description
- Start button

Example:

```text
Saudi Interview Coach
Practice job interviews with AI.

[Start Interview]
```

---

### 7.2 Interview Setup Page

Purpose:

Collect user information to personalize the interview.

Fields:

- Name
- Major
- Target role
- Company type
- Experience level
- Interview language

Button:

```text
[Start AI Interview]
```

---

### 7.3 Interview Page

Purpose:

Show the AI-generated question and allow the user to answer.

Content:

- Interview question
- Text box for user answer
- Submit button

Example:

```text
Question:
Tell me about yourself.

[Write your answer here...]

[Submit Answer]
```

---

### 7.4 Feedback Page

Purpose:

Show the AI evaluation of the user's answer.

Content:

- Score
- Feedback
- Improved answer
- Tips
- Next question button

Example:

```text
Score: 7/10

Feedback:
Good answer, but you should add more details about your projects.

Improved Answer:
...

[Next Question]
```

---

## 8. AI Role in the Application

The AI acts as a professional interview coach.

The AI should:

- Ask realistic interview questions
- Match the question to the user's background
- Evaluate answers clearly
- Give practical feedback
- Suggest improved answers
- Keep the language simple and helpful

---

## 9. User Input

The application collects two types of input.

### 9.1 Setup Input

Before the interview starts:

- Name
- Major
- Target role
- Company type
- Experience level
- Interview language

### 9.2 Interview Answer Input

During the interview:

- User's written answer to the interview question

---

## 10. AI Output

The AI should return:

- Interview question
- Score from 1 to 10
- Feedback
- Improved answer
- Tip for improvement

---

## 11. Example LLM Prompt

The application can send a prompt like this to the LLM API:

```text
Act as a professional interview coach for students and fresh graduates in Saudi Arabia.

The user is preparing for a job or cooperative training interview.

User information:
Name: Turki
Major: Computer Science
Target Role: Software Developer Intern
Company Type: Saudi Technology Company
Experience Level: Student
Interview Language: English

Your task:
1. Ask one realistic interview question suitable for this user.
2. After the user answers, evaluate the answer from 1 to 10.
3. Give simple and clear feedback.
4. Provide an improved version of the answer.
5. Give one practical tip for the next answer.

Keep the feedback simple, professional, and suitable for a student.
```

---

## 12. Example AI Response Format

The AI response should follow this structure:

```text
Question:
[Interview question here]

Score:
[Score from 1 to 10]

Feedback:
[Clear feedback here]

Improved Answer:
[Better version of the user's answer]

Tip:
[One useful tip]
```

---

## 13. MVP Scope

The first version of the application should be simple and text-based.

### Included in MVP

- Home page
- Interview setup page
- Interview question page
- Feedback page
- Text-based answers
- AI-generated interview questions
- AI feedback and improved answers

### Not Included in MVP

- Voice interview
- Video interview
- User accounts
- Saving interview history
- Company database
- Advanced analytics

These features can be added later if there is extra time.

---

## 14. Suggested Tech Stack

Next.js full app. 

### AI API

- Openrouter




---

## 15. Success Criteria

The project is successful if:

1. The user can enter interview setup information.
2. The app can generate an interview question using an LLM API.
3. The user can submit an answer.
4. The AI can evaluate the answer.
5. The app displays the score, feedback, improved answer, and tips.
6. The app is simple and easy to use.

---

## 16. Future Improvements

Possible future improvements:

- Add Arabic voice interview practice
- Add English voice interview practice
- Add company-specific interview modes
- Add interview history
- Add user accounts
- Add progress tracking
- Add difficulty levels
- Add behavioral and technical interview categories

---

## 17. Summary

Saudi Interview Coach is a simple AI-powered interview practice application. It helps students and fresh graduates prepare for job and cooperative training interviews in Saudi Arabia.

The user enters their information, the AI generates interview questions, the user answers, and the AI gives feedback, a score, and an improved answer.

The project is simple, practical, and clearly uses an LLM API inside the product.
