import { rest } from "msw";
import { data } from "./data";

let questions = [...data]; // Create a copy to avoid mutating original data

export const handlers = [
  rest.get("http://localhost:4000/questions", (req, res, ctx) => {
    return res(ctx.json(questions));
  }),
  rest.post("http://localhost:4000/questions", async (req, res, ctx) => {
    try {
      const body = await req.json();
      const id = questions.length > 0 ? Math.max(...questions.map(q => q.id)) + 1 : 1;
      const question = { id, ...body };
      questions.push(question);
      return res(ctx.json(question));
    } catch (error) {
      return res(ctx.status(400), ctx.json({ error: "Invalid JSON" }));
    }
  }),
  rest.delete("http://localhost:4000/questions/:id", (req, res, ctx) => {
    const { id } = req.params;
    questions = questions.filter((q) => q.id !== parseInt(id));
    return res(ctx.json({}));
  }),
  rest.patch("http://localhost:4000/questions/:id", async (req, res, ctx) => {
    try {
      const { id } = req.params;
      const body = await req.json();
      const { correctIndex } = body;
      const question = questions.find((q) => q.id === parseInt(id));
      if (!question) {
        return res(ctx.status(404), ctx.json({ message: "Invalid ID" }));
      }
      question.correctIndex = correctIndex;
      return res(ctx.json(question));
    } catch (error) {
      return res(ctx.status(400), ctx.json({ error: "Invalid JSON" }));
    }
  }),
];

// Export function to reset questions for testing
export const resetQuestions = () => {
  questions = [...data];
};
