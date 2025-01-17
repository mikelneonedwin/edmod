"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Timer, AlertCircle } from "lucide-react";

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
  timeLimit: number;
}

type props = {
  mode: "survival" | "number";
  initialQuestions: Question[];
};

export function QuizInterface({ initialQuestions }: props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(questions[0]?.timeLimit || 30);
  const [gameOver, setGameOver] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !gameOver) {
      setGameOver(true);
    }
  }, [timeLeft, gameOver]);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    const correct = answer === questions[currentQuestion].correctAnswer;

    if (correct) {
      setScore((prev) => prev + 1);
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion((prev) => prev + 1);
        setTimeLeft(questions[currentQuestion + 1].timeLimit);
      } else {
        setGameOver(true);
      }
    } else {
      setGameOver(true);
    }
  };

  if (gameOver) {
    return (
      <Card className="w-full max-w-2xl mx-auto p-6">
        <div className="text-center space-y-4">
          <AlertCircle className="mx-auto h-12 w-12 text-yellow-500" />
          <h2 className="text-2xl font-bold">Game Over!</h2>
          <p className="text-xl">Final Score: {score}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div className="text-sm font-medium">Score: {score}</div>
          <div className="flex items-center gap-2 text-sm font-medium">
            <Timer className="h-4 w-4" />
            {timeLeft}s
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            {questions[currentQuestion].text}
          </h2>
          <div className="grid gap-3">
            {questions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                variant={selectedAnswer === option ? "secondary" : "outline"}
                className="w-full justify-start px-4 py-8 text-left"
                onClick={() => handleAnswer(option)}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
