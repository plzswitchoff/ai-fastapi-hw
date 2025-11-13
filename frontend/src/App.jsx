import React, { useState } from "react";
import { translateAndScore } from "./api";

const App = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const run = async () => {
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const data = await translateAndScore(input);
      setResult(data);
    } catch (e) {
      setError(e.message || "에러 발생");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <h1>translate&review</h1>
      <div>
        <textarea
          rows={5}
          value={input}
          onChange={e=>setInput(e.target.value)}
          placeholder="내용을 입력해주세요"
        ></textarea>
        <br></br>
        <div>
          <button onClick={run} disabled={!input.trim() || loading}>
            {loading ? "분석 중..." : "분석하기"}
          </button>
          <button
            onClick={() => {
              setInput("");
              setResult(null);
              setError("");
            }}
            disabled={loading}
          >
            초기화
          </button>
        </div>
        {error && <p>{error}</p>}
        {result && (
          <section>
            <h3>결과</h3>
            <div>
              <div>
                <strong>원문:</strong>
                <div>{result.source}</div>
              </div>
              <div>
                <strong>번역:</strong>
                <div>{result.translated}</div>
              </div>
              <div>
                <strong>평가:</strong>
                <div>
                  {result.sentiment?.label} (
                  {(result.sentiment?.score * 100).toFixed(1)}%)
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default App;
