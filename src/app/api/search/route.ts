import { QdrantVectorStore } from "@langchain/qdrant";
import { qdrantClient } from "@/lib/qdrant";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { PromptTemplate } from "@langchain/core/prompts";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { query } = body;

    if (!query) {
      return new Response(JSON.stringify({ error: "Query is required" }), {
        status: 400,
      });
    }

    const embedding_function = new GoogleGenerativeAIEmbeddings({
      apiKey: process.env.GOOGLE_API_KEY!,
      modelName: "models/gemini-embedding-001",
    });

    const vectorStore = new QdrantVectorStore(embedding_function, {
      client: qdrantClient,
      collectionName: "newDocs",
      contentPayloadKey: "text",
    });

    const retriever = vectorStore.asRetriever({
      searchType: "similarity",
      k: 5,
    });

    const relevantDocs = await retriever.invoke(query);
    console.log("Relevant documents:", relevantDocs);

    const promptTemplate = PromptTemplate.fromTemplate(`
You are a friendly and helpful AI assistant 🤖.

Use the following context to answer the user's question clearly and naturally.  
If the user greets you, greet them back warmly with emojis 😊.  
If you don’t know the answer, simply say so — don’t make up information ❌.  

Context:
{relevant_docs}

Question:
{query}

Please give your final answer in a friendly tone with appropriate emojis 🌟.
Dont return markedown format.just plain text.
`);

    const formattedPrompt = await promptTemplate.format({
      relevant_docs: relevantDocs.map((doc) => doc.pageContent).join("\n\n"),
      query,
    });

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(formattedPrompt);
    const response = result.response.text();

    return new Response(
      JSON.stringify({
        response,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
