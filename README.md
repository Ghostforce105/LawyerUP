# ⚖️ LawyerUP – AI-Powered Legal Assistant  

![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge)  
![Tech Stack](https://img.shields.io/badge/Tech%20Stack-JS%20%7C%20Node.js%20%7C%20SQL-blue?style=for-the-badge)  
![AI Model](https://img.shields.io/badge/AI-LLaMA%202%20(LoRA)-purple?style=for-the-badge)  

---

## 📌 Project Description  

**LawyerUP** is a **full-stack web application** that simplifies the process of booking lawyers and provides **AI-powered legal consultations**. The platform enables users to:  

- **Browse and book lawyers** by specialization, availability, and ratings.  
- **Chat with an AI legal assistant** (powered by a fine-tuned **LLaMA 2** model).  
- **Make secure payments** and schedule appointments online.  

The AI chatbot acts as a **virtual legal advisor** for FAQs and preliminary case analysis, reducing initial lawyer workload.  

---

## ✨ Key Features  

✔ **Responsive Lawyer Booking Platform**  
- Search and book lawyers by specialization.  
- Integrated **secure payment gateway**.  

✔ **AI-Powered Legal Assistant**  
- Built using **LLaMA 2 fine-tuned for legal domain** (contracts, property, corporate law).  
- Deployed via **FastAPI and Hugging Face Transformers**.  

✔ **User Authentication & Profiles**  
- Secure **JWT-based login** system.  
- Users can view **past chats** and **appointments**.  

✔ **Lawyer Dashboard**  
- Lawyers manage **availability**, **appointments**, and **chat history**.  

---

## 🛠 Tech Stack  

| Component         | Technology                                |
|-------------------|-------------------------------------------|
| **Frontend**      | JavaScript, Vanilla CSS                  |
| **Backend**       | Node.js                                  |
| **AI Model**      | LLaMA 2 (fine-tuned using LoRA)          |
| **Database**      | SQL                                      |
| **AI Inference**  | PyTorch, Hugging Face, FastAPI           |

---

## 🗄 Database Overview  

- **Users Table** → Authentication and user details.  
- **Lawyers Table** → Specialization, ratings, availability.  
- **Appointments Table** → Booking and scheduling info.  
- **Chats Table** → AI conversation history.  

---

## 🔄 Workflow  

```mermaid
flowchart LR
A[User Visits Website] --> B[Browse Lawyers]
B --> C[Book Appointment & Make Payment]
C --> D[AI Legal Assistant Chat]
D --> E[Backend Handles Scheduling & AI API Calls]
E --> F[Lawyer Dashboard for Management]
