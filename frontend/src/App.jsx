import React, { useState } from "react";
import { translateAndScore } from "./api";
import "./App.css";

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
    <main className="app">
      <div className="app-container">
        <h1 className="app-title">translate&review</h1>

        <div className="card">
          <label className="field-label">텍스트 입력</label>
          <textarea
            className="app-textarea"
            rows={5}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="내용을 입력해주세요"
          ></textarea>

          <div className="button-row">
            <button
              className="btn btn-primary"
              onClick={run}
              disabled={!input.trim() || loading}
            >
              {loading ? "분석 중..." : "분석하기"}
            </button>
            <button
              className="btn btn-secondary"
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

          {error && <p className="error">{error}</p>}
        </div>

        {result && (
          <section className="result-card">
            <h3 className="section-title">결과</h3>
            <div className="result-grid">
              <div className="result-block">
                <strong className="result-label">원문</strong>
                <div className="result-text">{result.source}</div>
              </div>
              <div className="result-block">
                <strong className="result-label">번역</strong>
                <div className="result-text">{result.translated}</div>
              </div>
              <div className="result-block">
                <strong className="result-label">평가</strong>
                <div className="result-badge">
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
