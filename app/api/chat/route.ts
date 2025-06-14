import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = streamText({
    model: openai("gpt-4"),
    messages,
    system: "あなたは親切で知識豊富なAIアシスタントです。日本語で回答してください。",
  })

  return result.toDataStreamResponse()
}
