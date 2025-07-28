import React, { useEffect, useState } from "react";
import QuestionList from "./QuestionList";
import QuestionForm from "./QuestionForm";

function App() {
  const [questions, setQuestions] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((data) => {
        setQuestions(data);
      });
  }, []);

  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  function handleDeleteQuestion(id) {
    setQuestions(questions.filter((q) => q.id !== id));
  }

  function handleUpdateQuestion(updated) {
    setQuestions(questions.map((q) => (q.id === updated.id ? updated : q)));
  }

  return (
    <main>
      <nav>
        <button onClick={() => setShowForm(true)}>New Question</button>
        <button onClick={() => setShowForm(false)}>View Questions</button>
      </nav>
      {showForm ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDelete={handleDeleteQuestion}
          onUpdate={handleUpdateQuestion}
        />
      )}
    </main>
  );
}

export default App;
