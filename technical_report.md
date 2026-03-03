# 📄 Technical Deep Dive: Balu's Study Pro

This document provides a comprehensive technical overview of the architecture and technologies powering **Balu's Study Pro**.

---

## 1. Core Architecture
The system follows a **Modular Agent-Based Architecture**. Instead of one large script, the "brain" of the application is divided into specialized agents:
- **`GoalPlannerAgent`**: Specialized in combinatorial time management and JSON structure generation.
- **`ConceptExplainerAgent`**: Specialized in document retrieval and educational simplification.
- **`QuizGenerator`**: Specialized in pedagogical assessment generation.

---

## 2. RAG (Retrieval-Augmented Generation)
This is the core "Magic" that allows the AI to read your specific PDFs. The workflow is as follows:

1.  **Document Ingestion**: We use `pdfplumber` to extract raw text from uploaded files while preserving logical structure.
2.  **Semantic Chunking**: The text is split into chunks of **1000 characters** with a **100-character overlap**. This ensures that the context isn't lost at the borders of a chunk.
3.  **Vector Embeddings**: We use the `all-MiniLM-L6-v2` model from **Sentence-Transformers**. This converts human text into a **384-dimensional vector** (numerical representation of "meaning").
4.  **Vector Store (FAISS)**: These vectors are stored in a **FAISS** index. FAISS (Facebook AI Similarity Search) is an industry-standard library for ultra-fast similarity search.
5.  **Retrieval**: When you ask a question, the system converts your question into a vector and finds the top **3 most relevant chunks** from your PDF.
6.  **Augmentation**: The LLM receives the question *plus* the 3 chunks as ground truth, ensuring it doesn't "hallucinate" and only answers based on your notes.

---

## 3. High-Performance LLM (Groq + Llama 3.3)
For the "thinking" part, we use **Llama 3.3 70B** running on **Groq LPUs** (Language Processing Units).
- **Speed**: Inference speeds of **500+ tokens per second**, meaning the AI responds almost instantly.
- **Reliability**: Use of the `ChatGroq` orchestration layer from **LangChain**.

---

## 4. Full Tech Stack Summary
| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Language** | Python 3.10 | Core logic and AI libraries. |
| **Frontend** | Streamlit | Rapid development of the data-centric UI. |
| **Logic Orchestration** | LangChain | Managing the flow between RAG and LLMs. |
| **Vector DB** | FAISS | Storage and retrieval of document fragments. |
| **Embeddings** | HuggingFace (Local) | Transforming text into mathematical vectors. |
| **LLM Provider** | Groq Cloud | Hosting the Llama 3.3 model with low latency. |
| **Design/Theme** | Vanilla CSS | Custom emerald/dark-blue premium aesthetic. |

---

## 5. Security & Persistence
- **Environment Variables**: API keys are stored in a `.env` file (never hardcoded) to prevent unauthorized access.
- **Local JSON Storage**: All user data, study plans, and performance history are stored in `data/user_data/` using structured JSON, ensuring privacy and offline availability.

---

