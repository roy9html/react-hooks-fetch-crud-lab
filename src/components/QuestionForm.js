import React, { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    correctIndex: 0,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newQuestion = {
      prompt: formData.prompt,
      answers: [
        formData.answer1,
        formData.answer2,
        formData.answer3,
        formData.answer4,
      ],
      correctIndex: parseInt(formData.correctIndex),
    };

    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestion),
    })
      .then((r) => r.json())
      .then(onAddQuestion);

    setFormData({
      prompt: "",
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: "",
      correctIndex: 0,
    });
  }

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input name="prompt" value={formData.prompt} onChange={handleChange} />
        </label>
        <label>
          Answer 1:
          <input name="answer1" value={formData.answer1} onChange={handleChange} />
        </label>
        <label>
          Answer 2:
          <input name="answer2" value={formData.answer2} onChange={handleChange} />
        </label>
        <label>
          Answer 3:
          <input name="answer3" value={formData.answer3} onChange={handleChange} />
        </label>
        <label>
          Answer 4:
          <input name="answer4" value={formData.answer4} onChange={handleChange} />
        </label>
        <label>
          Correct Answer:
          <select
            name="correctIndex"
            value={formData.correctIndex}
            onChange={handleChange}
          >
            <option value={0}>Answer 1</option>
            <option value={1}>Answer 2</option>
            <option value={2}>Answer 3</option>
            <option value={3}>Answer 4</option>
          </select>
        </label>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;
