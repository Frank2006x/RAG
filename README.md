# Sweet Delights Bakery RAG Assistant 🍰

A Retrieval-Augmented Generation (RAG) chatbot built with Next.js, Google's Gemini AI, and Qdrant vector database. This application provides intelligent responses about bakery products, services, and information by combining document retrieval with AI-generated responses.

## Features ✨

- **Real-time Chat Interface**: Clean, responsive chat UI built with Next.js and DaisyUI
- **RAG Implementation**: Uses Gemini embeddings and Qdrant for semantic search
- **Smart Context**: Retrieves relevant bakery information to provide accurate responses
- **Emoji-rich Responses**: Friendly AI responses with contextual emojis
- **Auto-scrolling Chat**: Smooth scrolling to latest messages

## Tech Stack 🛠️

- **Frontend**: Next.js 15.5, React 19, TailwindCSS, DaisyUI
- **AI/ML**: Google Gemini AI (embeddings and text generation)
- **Vector DB**: Qdrant Cloud
- **Data Processing**: LangChain for document processing and RAG
- **Language**: TypeScript

## Getting Started 🚀

### Prerequisites

- Node.js (v18 or higher)
- NPM or Yarn
- Google AI API key
- Qdrant Cloud instance

### Environment Setup

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Create \`.env.local\` file:
   \`\`\`env
   GOOGLE_API_KEY=your_google_ai_api_key
   QDRANT_URL=your_qdrant_cloud_url
   QDRANT_API_KEY=your_qdrant_api_key
   \`\`\`

### Data Ingestion

1. Place your text documents in the \`documents\` folder
2. Run the Python ingestion script:
   \`\`\`python

# The script uses:

# - LangChain for document processing

# - Gemini for embeddings (3072 dimensions)

# - Qdrant for vector storage

python ingest.py
\`\`\`

### Running the Application

1. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

2. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure 📁

\`\`\`
src/
├── app/
│ ├── api/
│ │ └── search/
│ │ └── route.ts # RAG search endpoint
│ ├── layout.tsx # App layout with Geist font
│ ├── page.tsx # Chat interface
│ └── globals.css # Global styles + DaisyUI
└── lib/
├── qdrant.ts # Qdrant client configuration
└── check-collection.ts # Collection verification tool
\`\`\`

## API Endpoints 📚

### POST /api/search

Search endpoint that combines RAG with Gemini text generation.

**Request**:
\`\`\`json
{
"query": "What are your opening hours?"
}
\`\`\`

**Response**:
\`\`\`json
{
"response": "🕐 We're open Monday to Friday from 7 AM to 7 PM, and Saturday from 8 AM to 5 PM. We're closed on Sundays! 🎂"
}
\`\`\`

## Vector Store Details 🔍

- **Collection**: \`newDocs\`
- **Vectors**: 3072 dimensions (Gemini embeddings)
- **Distance**: Cosine similarity
- **Payload Structure**:
  ```json
  {
    "text": "Document content",
    "source": "documents/filename.txt"
  }
  ```

## Development Commands 🛠️

```bash
# Development with hot reload
npm run dev

# Build for production
npm run build

# Production server
npm run start

# Lint code
npm run lint
```

## Built With 🏗️

- [Next.js](https://nextjs.org/) - React framework
- [Gemini AI](https://ai.google.dev/) - AI model for embeddings and text generation
- [Qdrant](https://qdrant.tech/) - Vector database
- [LangChain](https://js.langchain.com/) - RAG framework
- [DaisyUI](https://daisyui.com/) - UI components
- [TailwindCSS](https://tailwindcss.com/) - Styling

## License 📄

This project is licensed under the MIT License.
