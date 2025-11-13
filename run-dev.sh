#!/usr/bin/env bash

# 백엔드 실행
cd backend
source venv/bin/activate
uvicorn main:app --reload &
BACK_PID=$!

# 프론트 실행
cd ../frontend
npm run dev &
FRONT_PID=$!

# 둘 다 끝날 때까지 대기
wait $BACK_PID $FRONT_PID
