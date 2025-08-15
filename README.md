# LawyerUP
# Project Description:

This project is a full-stack web application that enables users to book appointments with lawyers, chat with an AI legal assistant, and manage consultations efficiently. The platform integrates a fine-tuned LLaMA 2 model to provide intelligent responses to client queries, simulating a professional legal assistant for preliminary advice and case triage.

The system allows users to:

Browse and book lawyers based on specialization, availability, and ratings.

Chat with an AI Legal Assistant fine-tuned on legal datasets for FAQs, case queries, and initial consultations.

Make secure payments and schedule appointments online.

# Key Features:

Responsive Lawyer Booking Website

Built with js (frontend) and Node.js (backend).

Integrated payment gateway for online booking.

AI-Powered Chatbot

Uses LLaMA 2.0 fine-tuned for legal domain (contracts, property law, corporate law, etc.).

Hosted on a server with Hugging Face transformers

User Authentication & Profiles

JWT-based authentication for secure login.

Users can view past chats and booked appointments.

Lawyer Dashboard

Lawyers can manage appointments, availability, and chat history.

# Database:

SQL for user and booking data.

# Tech Stack:

Frontend: js, Vanilla CSS

Backend: Node.js 

AI Model: LLaMA 2.0 (fine-tuned using LoRA)

Database: SQL

Integration: PyTorch, Hugging Face, FastAPI for AI inference

# Workflow:

User visits website → Browses lawyers → Books appointment.

AI Legal Agent → Answers queries using fine-tuned LLaMA 2 model.

Backend handles scheduling, payments, and AI API calls.

Lawyer Dashboard → Manages availability and client chats.
