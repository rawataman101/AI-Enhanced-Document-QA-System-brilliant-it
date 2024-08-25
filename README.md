# AI-Enhanced Document Processing and Question Answering System
``Demo`` - https://youtu.be/0fBWL9b9YLQ

<img src="https://github.com/user-attachments/assets/4356e328-99dd-4149-a03c-4b76c2cf7026"  width="600" height="300">

<img src="https://github.com/user-attachments/assets/66ec9d1d-5f1c-4a50-b714-3d5f09ed0719"  width="600" height="300">

##### This project implements an AI-driven document processing and question-answering system with the following components:

## Document Processing Pipeline:
- Text extraction from PDFs
- Named Entity Recognition (NER)
- Vector embedding generation using Azure OpenAI
- Integration with Pinecone for vector storage and retrieval
- Topic modeling and metadata update in Pinecone

### Question Answering System:
- Retrieval Augmented Generation (RAG) for advanced text analysis
- Uses GPT-4 API for generating AI-powered responses

### Frontend:
- PDF upload interface
- Chat-style question-answering interface

## Installation and Setup

### Backend
The backend is built with Node.js and integrates with Azure OpenAI and Pinecone for document processing and AI-powered question answering.

Clone the Repository:

```
git clone https://github.com/your-username/your-repo-name.git
```

```
cd your-repo-name/backend
```

Install Dependencies:

```
npm install
```

Environment Variables:
Create a .env file in the backend directory with the following variables:

```
PINECONE_API_KEY=your-pinecone-api-key
PINECONE_INDEX_NAME=your-pinecone-index-name
PINECONE_ENVIRONMENT=your-pinecone-environment
AZURE_OPENAI_API_KEY=your-azure-openai-api-key
AZURE_OPENAI_ENDPOINT=your-azure-openai-endpoint
AZURE_OPENAI_API_VERSION=2024-02-01
```

Run the Backend Server:

```
nodemon server.js
```

### Frontend
The frontend is a simple web interface with two pages: one for PDF upload and the other for AI-powered question answering.

Navigate to the Frontend Directory:
```
cd ../frontend
```

Install Dependencies:
```
npm install
```

Environment Variables:
Ensure your frontend environment variables point to the backend server:
``
REACT_APP_BACKEND_URL=http://localhost:3000
``

Run the Frontend Server:

```
npm start
```

### Python Script
The Python script is responsible for topic modeling and updating Pinecone metadata.

Navigate to the Script Directory:
```
cd ../script
```

#### Setup a Virtual Environment:
```
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
Install Dependencies:
```

```
pip install -r requirements.txt
```

Environment Variables: 
Create a .env file in the script directory with the following variables:

```
PINECONE_API_KEY=your-pinecone-api-key
PINECONE_INDEX_NAME=your-pinecone-index-name
PINECONE_ENVIRONMENT=your-pinecone-environment
```

Run the Script:

```
python script.py
```

### Usage

#### Upload a PDF:

Visit the upload page in the frontend.
Upload your document, and it will be processed by the backend pipeline.

#### Ask Questions:

Navigate to the chat page in the frontend.
Ask questions about the uploaded documents. The system will retrieve relevant information from Pinecone and generate an AI-powered response.

## Assumptions

### Azure OpenAI Setup:

- It is assumed that you have already deployed a model (like text-embedding-ada-002 or gpt-35-turbo or gpt-4) on Azure OpenAI and have the necessary API keys and endpoints configured.

### Pinecone Index:

- The Pinecone index should be pre-configured with the correct dimensions (e.g., 1536 for text-embedding-ada-002) and metric (e.g., cosine).

### Text Data Format:

- It is assumed that the text extracted from PDFs and stored in Pinecone is in a consistent format that the topic modeling algorithm can process effectively.

## Brief Explanation of Approach and Challenges

### Approach
The project was designed to integrate AI capabilities with modern web development practices, using a microservices architecture. Each component, from the backend processing to the frontend user interface, was built to ensure modularity and scalability.

### Backend:

- The backend was built using Node.js, incorporating APIs from Azure OpenAI for embedding generation and text completion.
Pinecone was chosen for vector storage and retrieval due to its efficient handling of large-scale embeddings.
A key feature of the backend is the use of Retrieval Augmented Generation (RAG) to combine the retrieval of relevant documents from Pinecone with AI-generated responses.
Frontend:

- The frontend was developed using modern React.js practices, creating a user-friendly interface for both document upload and AI-powered chat functionality.
The design was inspired by modern chat applications like ChatGPT, focusing on minimalistic and dark-themed aesthetics.

### Python Script:

- A Python script was developed to perform topic modeling on the text data stored in Pinecone.
Latent Dirichlet Allocation (LDA) was employed to uncover underlying topics in the documents, which were then added to the document metadata within Pinecone.

## Challenges

#### Pinecone API Integration:

- The transition from earlier versions of the Pinecone API to the latest, which requires instantiation of the Pinecone class rather than using pinecone.init(), required adjusting existing code and understanding new API methods.
Fetching vector data from Pinecone presented challenges due to the absence of a direct method to retrieve all vector IDs. This required creating a custom loop to fetch vectors based on existing metadata.

#### Topic Modeling:

- LDA requires careful tuning of parameters like the number of topics (n_components). Ensuring meaningful and distinct topics from the text data was a balancing act between the complexity of the documents and the number of topics extracted.
Mapping the topics back to the correct vectors in Pinecone posed a challenge due to possible discrepancies in the number of topics versus the number of vectors retrieved.
Integration of Multiple Components:

- Ensuring smooth communication between the Python-based topic modeling script, the Node.js backend, and the React frontend required careful orchestration. Handling API calls, data processing, and asynchronous operations were key to making the system responsive and reliable.
Data Consistency:

- Maintaining consistency between the text data, vector embeddings, and associated metadata in Pinecone required implementing error handling and validation mechanisms to prevent and correct any discrepancies.
