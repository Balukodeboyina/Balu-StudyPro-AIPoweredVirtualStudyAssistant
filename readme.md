# ⚡ Balu's Study Pro: Virtual Study Assistant

![Header](https://img.shields.io/badge/Design-Personalized-emerald?style=for-the-badge)
![Tech](https://img.shields.io/badge/Powered%20By-Groq%20%7C%20LangChain-blue?style=for-the-badge)

Welcome to **Balu's Study Pro**, a premium AI-powered academic suite designed to revolutionize your learning experience through advanced artificial intelligence and personalized study workflows.

---

## 🚀 Features
- **Smart Material Ingestion**: Support for PDF and TXT file uploads with automatic indexing.
- **AI-Powered Q&A**: A specialized chat interface that understands your specific documents.
- **Adaptive Study Planner**: Generates realistic, goal-oriented study plans with trackable tasks and milestones.
- **Dynamic Quiz Generation**: Automatically creates assessments from your study materials with instant feedback and explanations.
- **Performance Analytics**: Visual tracking of your quiz scores and study progress over time.
- **Balu's Daily Spark**: Integrated motivational system for consistent study habits.
- **Premium Emerald UI**: A custom-designed dark theme optimized for student focus.

---

## 🧠 Technologies Used
- **Python 3.10**: The robust backbone of the application.
- **Streamlit**: For building the interactive, high-performance web dashboard.
- **LangChain**: The leading framework for building LLM-powered agentic workflows.
- **Groq Cloud (LPU)**: Ultra-fast hardware for running Large Language Models with near-zero latency.
- **Llama 3.3 70B**: The state-of-the-art brain behind the intelligent features.
- **FAISS**: Facebook AI Similarity Search for efficient document indexing and retrieval.
- **Sentence-Transformers**: For generating high-quality semantic embeddings locally.

---

## 🛠️ Setup Instructions
1.  **Clone the Repository**:
    ```bash
    git clone [your-repo-link]
    cd dt&i
    ```
2.  **Install Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```
3.  **Configure API Key**:
    - Create a `.env` file in the root directory.
    - Add: `GROQ_API_KEY=your_free_groq_key_here`
4.  **Launch the Application**:
    - Double-click **`run_app.bat`** OR run `streamlit run app.py` in your terminal.

---

## 📝 Project Concept
The **Balu's Study Pro** concept is built on the idea of a **"Digital Academic Coach."** Unlike standard chatbots, this project understands that every student has different materials and learning speeds. It acts as an intermediary between dense academic papers and the student's need for simplified, actionable knowledge. It prioritizes **Active Recall** (quizzes) and **Spaced Repetition** (scheduling), two of the most effective learning techniques.

---

## 🔍 How RAG Works in This Project
**RAG (Retrieval-Augmented Generation)** is the technical heart of the system. In this project, it follows these steps:
1.  **Document Chunking**: The system cuts your PDF into small, overlapping pieces (1000 chars) so no data is lost.
2.  **Vectorization**: It uses a specialized AI model to turn text into "math vectors" (numerical representations of meaning).
3.  **Semantic Search**: When you ask a question, the system searches the database for the *meaning* of your question, not just keywords.
4.  **Context Injection**: It finds the top 3 most relevant pieces of your PDF and hands them to the AI to answer specifically from your notes.

---

## 💡 Why RAG?
Standard AI models (like ChatGPT) only know what they were trained on until their "cutoff date." They don't know your specific school notes or today's textbook. **RAG** solves this by:
- **Eliminating Hallucinations**: The AI only answers based on the context provided from your PDF.
- **Data Privacy**: Your documents are indexed locally, giving you a private, secure study environment.
- **Dynamic Knowledge**: You can upload a new PDF every day, and the AI is instantly updated with that new information.

---

## 📂 Key Modules Implemented
```text
├── agents/             # AI Brain logic (Goal Planner, Explainer)
├── tools/              # Utility tools (Quiz Generator)
├── utils/              # PDF & Auth management
├── data/               # Local storage for your documents & users
├── app.py              # Main Application (UI & Entry point)
├── run_app.bat         # Quick start script
└── .env                # Secure API key storage
```
- **`app.py`**: The central nervous system, managing the UI, session state, and user interactions.
- **`agents/goal_planner.py`**: Logic for breaking down massive goals into small, daily study hours.
- **`utils/document_processor.py`**: The engine that cleans and prepares text for the AI.
- **`utils/vector_store.py`**: Manages the FAISS database for lightning-fast document retrieval.
- **`tools/quiz_generator.py`**: Specifically tuned to transform document context into Multiple Choice Questions.

---

## ⚙️ AI & Technologies Used (Deep Dive)
Beyond the basic stack, we utilize **Llama 3.3 70B**, one of the most powerful open-weights models available. By pairing it with **Groq’s Language Processing Units (LPUs)**, we achieve inference speeds (500+ tokens/sec) that make the AI feel like a real-time conversation partner. We also use **`all-MiniLM-L6-v2`**, a lightweight yet precise embedding model that allows semantic search to run efficiently even on standard laptops.

---

## 🏁 Conclusion
**Balu's Study Pro** is more than just a software project; it is a personalized academic companion. By bridging the gap between advanced AI (RAG) and practical student needs (Study Planning & Quizzing), it provides a complete ecosystem for academic success. 

**"Empowering students through the fusion of AI and efficient learning."**

---
*Designed and Developed with ❤️ by **Balu***
