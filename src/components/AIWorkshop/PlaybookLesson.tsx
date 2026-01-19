import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, CheckCircleIcon, CloseIcon, LightbulbIcon, SparkleIcon, BookIcon } from './icons';

// Question types for interactive learning
interface MultipleChoiceQuestion {
  type: 'multiple-choice';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface TrueFalseQuestion {
  type: 'true-false';
  question: string;
  correctAnswer: boolean;
  explanation: string;
}

interface FillBlankQuestion {
  type: 'fill-blank';
  question: string; // Use ___ for blank
  answer: string;
  acceptableAnswers: string[];
  explanation: string;
}

type Question = MultipleChoiceQuestion | TrueFalseQuestion | FillBlankQuestion;

interface LessonStep {
  title: string;
  content: string;
  tip?: string;
  question?: Question;
}

interface PlaybookLessonData {
  id: number;
  title: string;
  description: string;
  steps: LessonStep[];
}

// Sample lessons with interactive questions
export const playbookLessons: PlaybookLessonData[] = [
  {
    id: 1,
    title: "Getting Started with AI Coding",
    description: "Learn the basics of working with AI coding assistants",
    steps: [
      {
        title: "Understanding AI Code Assistants",
        content: "AI code assistants like GitHub Copilot, Cursor, and Codeium work by analyzing the context of your code—including comments, function names, and surrounding code—to suggest relevant completions. They're trained on millions of code repositories and can understand patterns across many programming languages.",
        tip: "Think of AI assistants as a knowledgeable pair programmer who can suggest code but needs your guidance to produce the best results."
      },
      {
        title: "Installing Your First AI Assistant",
        content: "Most AI coding assistants are available as IDE extensions. For VS Code, you can find them in the Extensions marketplace. For JetBrains IDEs, check the Plugins section. GitHub Copilot requires a subscription, while Codeium offers a free tier.",
        question: {
          type: 'multiple-choice',
          question: "Which of the following is NOT a common way to access AI coding assistants?",
          options: [
            "VS Code Extensions",
            "JetBrains Plugins",
            "Command-line only tools",
            "Browser extensions for web IDEs"
          ],
          correctIndex: 2,
          explanation: "While some AI tools have CLIs, most coding assistants are integrated directly into IDEs as extensions or plugins for the best real-time experience. Command-line only tools are less common for code completion."
        }
      },
      {
        title: "Writing Effective Comments",
        content: "AI assistants use your comments to understand intent. Write clear, specific comments that describe WHAT you want to achieve, not HOW to achieve it. For example, instead of '// loop through array', write '// Filter users who have been active in the last 30 days'.",
        question: {
          type: 'multiple-choice',
          question: "Which comment would give the AI assistant better context?",
          options: [
            "// do the thing",
            "// loop here",
            "// Calculate the average rating from all verified reviews, excluding outliers",
            "// function"
          ],
          correctIndex: 2,
          explanation: "The third option provides clear intent and specific requirements (verified reviews, excluding outliers), giving the AI much better context to generate accurate code."
        }
      },
      {
        title: "Accepting and Modifying Suggestions",
        content: "When you see a suggestion, you can: 1) Accept it fully with Tab, 2) Accept word-by-word with Ctrl+Right, 3) See alternative suggestions with Alt+], or 4) Dismiss and write your own code. Remember: AI suggestions are starting points, not final answers.",
        tip: "Build a habit of reviewing suggestions before accepting. Quick acceptance can introduce bugs or non-idiomatic code.",
        question: {
          type: 'true-false',
          question: "You should always accept the first AI suggestion without reviewing it to maximize productivity.",
          correctAnswer: false,
          explanation: "Always review AI suggestions before accepting! While AI can be accurate, it can also suggest code with bugs, security issues, or patterns that don't match your codebase. A quick review takes seconds and can prevent hours of debugging."
        }
      },
      {
        title: "Practice Exercise",
        content: "Now it's your turn! Open your IDE with an AI assistant installed. Create a new file and write a comment describing a simple function you need (like sorting an array of objects by a property). Watch how the AI responds to different levels of detail in your comments.",
        question: {
          type: 'fill-blank',
          question: "The best AI coding suggestions come from providing clear ___ in your comments and code.",
          answer: "context",
          acceptableAnswers: ["context", "intent", "details", "information"],
          explanation: "Context is key! AI assistants perform best when they understand your intent, the purpose of the code, and any specific requirements. The more context you provide, the better the suggestions."
        }
      }
    ]
  },
  {
    id: 2,
    title: "AI-Powered Code Review",
    description: "Use AI to accelerate your code review process",
    steps: [
      {
        title: "Why AI Code Review?",
        content: "AI can help catch common issues, suggest improvements, and explain complex code. Tools like GitHub Copilot Chat, Claude, and specialized tools like CodeRabbit can review your code for bugs, security vulnerabilities, and style issues.",
        tip: "AI review complements human review—it doesn't replace it. Use AI for first-pass checking, then human review for business logic and architecture."
      },
      {
        title: "Setting Up AI Review Tools",
        content: "You can use AI for code review in several ways: 1) IDE chat features (Copilot Chat, Cursor), 2) PR review bots (CodeRabbit, PR-Agent), 3) Copy-paste into Claude or ChatGPT, 4) Custom scripts with AI APIs.",
        question: {
          type: 'multiple-choice',
          question: "What's the most efficient way to get AI review on a pull request?",
          options: [
            "Copy each file manually to ChatGPT",
            "Use an automated PR review bot like CodeRabbit",
            "Wait for human reviewers only",
            "Only review code after it's merged"
          ],
          correctIndex: 1,
          explanation: "Automated PR review bots integrate directly with your Git workflow, automatically reviewing changes when PRs are opened. This is more efficient than manual copy-paste and provides feedback at the right time in the development process."
        }
      },
      {
        title: "Crafting Review Prompts",
        content: "When asking AI to review code, be specific about what you want checked: 'Review this code for security vulnerabilities, focusing on input validation and SQL injection.' or 'Check this function for edge cases and potential null pointer exceptions.'",
        question: {
          type: 'true-false',
          question: "A generic prompt like 'Review this code' will give you the most comprehensive feedback.",
          correctAnswer: false,
          explanation: "Specific prompts yield better results. Instead of 'review this code', ask for specific checks: security issues, performance problems, edge cases, code style, etc. Generic prompts often miss important issues."
        }
      },
      {
        title: "Interpreting AI Feedback",
        content: "AI might suggest changes that don't fit your codebase or requirements. Learn to: 1) Evaluate each suggestion critically, 2) Understand why the AI made the suggestion, 3) Adapt suggestions to your context, 4) Dismiss false positives confidently.",
        question: {
          type: 'fill-blank',
          question: "When AI suggests a code change, you should always evaluate it ___ before implementing.",
          answer: "critically",
          acceptableAnswers: ["critically", "carefully", "thoroughly"],
          explanation: "Critical evaluation is essential. AI suggestions may not account for your specific context, business requirements, or existing patterns in your codebase. Always think about whether the suggestion makes sense for your situation."
        }
      }
    ]
  },
  {
    id: 3,
    title: "Prompt Engineering Basics",
    description: "Learn how to write better prompts for AI tools",
    steps: [
      {
        title: "What is Prompt Engineering?",
        content: "Prompt engineering is the practice of crafting effective inputs to get better outputs from AI systems. A well-structured prompt can dramatically improve the quality, relevance, and accuracy of AI responses.",
        tip: "Think of prompts like instructions to a very literal-minded assistant. The more precise and structured your instructions, the better the results."
      },
      {
        title: "The Basic Prompt Structure",
        content: "A good prompt typically includes: 1) Context - background information, 2) Task - what you want done, 3) Format - how you want the output, 4) Constraints - any limitations or requirements. Not every prompt needs all four, but more structure usually means better results.",
        question: {
          type: 'multiple-choice',
          question: "Which prompt is more likely to give a useful response?",
          options: [
            "Write code",
            "Help me",
            "Write a Python function that takes a list of numbers and returns the top 3 highest values, sorted descending",
            "Do something with numbers"
          ],
          correctIndex: 2,
          explanation: "The third option specifies the language (Python), the input (list of numbers), the desired output (top 3 highest), and the format (sorted descending). This clarity leads to much better AI responses."
        }
      },
      {
        title: "Using Examples (Few-Shot Prompting)",
        content: "Showing the AI examples of what you want is incredibly powerful. This is called 'few-shot prompting'. For instance: 'Convert these sentences to formal business language. Example: \"gonna send it tmrw\" → \"I will send it tomorrow.\" Now convert: \"cant make the meeting\"'",
        question: {
          type: 'true-false',
          question: "Providing one or two examples of the desired output format usually improves AI response quality.",
          correctAnswer: true,
          explanation: "Yes! Few-shot prompting (providing examples) is one of the most effective techniques. It shows the AI exactly what format and style you expect, reducing ambiguity and improving consistency."
        }
      },
      {
        title: "Iterating on Prompts",
        content: "Rarely does the first prompt give perfect results. Effective prompt engineering is iterative: 1) Start with a basic prompt, 2) Analyze what's missing or wrong in the output, 3) Add more context or constraints, 4) Repeat until satisfied.",
        question: {
          type: 'fill-blank',
          question: "Good prompt engineering is an ___ process where you refine your prompts based on the AI's responses.",
          answer: "iterative",
          acceptableAnswers: ["iterative", "ongoing", "continuous"],
          explanation: "Iteration is key! Even experienced prompt engineers rarely get perfect results on the first try. Each refinement helps you understand what the AI needs to produce better output."
        }
      }
    ]
  },
  {
    id: 4,
    title: "AI Safety & Best Practices",
    description: "Learn responsible AI usage in the workplace",
    steps: [
      {
        title: "Understanding AI Limitations",
        content: "AI systems can: hallucinate facts, produce biased outputs, leak sensitive training data patterns, and confidently present wrong information. Always verify AI outputs for accuracy, especially for facts, code security, and important decisions.",
        tip: "If you can't verify an AI's output, be cautious about using it in production or sharing it as fact."
      },
      {
        title: "Data Privacy Considerations",
        content: "Before using AI tools, understand: 1) Is data sent to external servers? 2) Is data used for training? 3) What's the retention policy? 4) Is it approved by your company? Never paste sensitive code, customer data, or credentials into unapproved AI tools.",
        question: {
          type: 'multiple-choice',
          question: "What should you do before pasting code into an AI tool?",
          options: [
            "Just paste it immediately—it's just code",
            "Check if the tool is company-approved and understand its data handling policies",
            "Only use AI for personal projects, never for work",
            "Assume all AI tools are safe by default"
          ],
          correctIndex: 1,
          explanation: "Always check your company's approved tools list and understand how the AI handles your data. Code often contains sensitive business logic, API patterns, or comments that could reveal confidential information."
        }
      },
      {
        title: "Avoiding Over-Reliance",
        content: "AI is a powerful tool, but over-reliance can atrophy your skills and judgment. Use AI to: accelerate known tasks, learn new patterns, overcome blocks. Don't use AI as a crutch for understanding fundamentals or making critical decisions without review.",
        question: {
          type: 'true-false',
          question: "Junior developers should use AI to write all their code to maximize productivity.",
          correctAnswer: false,
          explanation: "Over-reliance on AI can prevent developers from building fundamental skills. AI should augment learning, not replace it. Junior developers especially benefit from understanding why code works, not just getting working code."
        }
      },
      {
        title: "Building Good AI Habits",
        content: "Develop these habits: 1) Always review AI output before using, 2) Cite or note when AI was used for important work, 3) Keep learning fundamentals alongside AI tools, 4) Share effective prompts with your team, 5) Stay updated on your company's AI policies.",
        question: {
          type: 'fill-blank',
          question: "The most important habit when using AI is to always ___ the output before using it.",
          answer: "review",
          acceptableAnswers: ["review", "verify", "check", "validate"],
          explanation: "Reviewing AI output is non-negotiable. Even the best AI makes mistakes. A quick review can catch errors before they become bugs in production, misinformation in documents, or security vulnerabilities in code."
        }
      }
    ]
  }
];

interface PlaybookLessonProps {
  lesson: PlaybookLessonData;
  onClose: () => void;
  onComplete: (lessonId: number) => void;
  darkMode?: boolean;
}

export const PlaybookLesson: React.FC<PlaybookLessonProps> = ({ 
  lesson, 
  onClose, 
  onComplete,
  darkMode = false 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | boolean | string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answeredCorrectly, setAnsweredCorrectly] = useState<boolean | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const step = lesson.steps[currentStep];
  const progress = ((currentStep + 1) / lesson.steps.length) * 100;

  const handleAnswer = (answer: number | boolean | string) => {
    setSelectedAnswer(answer);
    
    const question = step.question;
    if (!question) return;

    let isCorrect = false;
    
    if (question.type === 'multiple-choice') {
      isCorrect = answer === question.correctIndex;
    } else if (question.type === 'true-false') {
      isCorrect = answer === question.correctAnswer;
    } else if (question.type === 'fill-blank') {
      const answerStr = String(answer).toLowerCase().trim();
      isCorrect = question.acceptableAnswers.some(a => a.toLowerCase() === answerStr);
    }

    setAnsweredCorrectly(isCorrect);
    setShowExplanation(true);
    
    if (isCorrect) {
      setCompletedSteps(new Set([...completedSteps, currentStep]));
    }
  };

  const goNext = () => {
    if (currentStep < lesson.steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setAnsweredCorrectly(null);
    } else {
      onComplete(lesson.id);
    }
  };

  const goPrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setAnsweredCorrectly(null);
    }
  };

  const canProceed = !step.question || showExplanation;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal */}
      <div className={`relative w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col ${
        darkMode ? 'bg-neutral-900' : 'bg-white'
      }`}>
        {/* Header */}
        <div className={`px-6 py-4 border-b ${darkMode ? 'border-neutral-800' : 'border-neutral-200'}`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                darkMode ? 'bg-neutral-800' : 'bg-neutral-900'
              }`}>
                <BookIcon className="text-white" size={20} />
              </div>
              <div>
                <h2 className={`font-semibold ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
                  {lesson.title}
                </h2>
                <p className={`text-xs ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                  Step {currentStep + 1} of {lesson.steps.length}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                darkMode ? 'hover:bg-neutral-800 text-neutral-400' : 'hover:bg-neutral-100 text-neutral-500'
              }`}
            >
              <CloseIcon size={20} />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className={`h-2 rounded-full overflow-hidden ${darkMode ? 'bg-neutral-800' : 'bg-neutral-100'}`}>
            <div 
              className="h-full bg-emerald-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Step Title */}
          <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
            {step.title}
          </h3>
          
          {/* Step Content */}
          <p className={`leading-relaxed mb-6 ${darkMode ? 'text-neutral-300' : 'text-neutral-600'}`}>
            {step.content}
          </p>

          {/* Tip Box */}
          {step.tip && (
            <div className={`p-4 rounded-xl mb-6 flex gap-3 ${
              darkMode ? 'bg-amber-900/30 border border-amber-800' : 'bg-amber-50 border border-amber-200'
            }`}>
              <LightbulbIcon className={`flex-shrink-0 mt-0.5 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`} size={20} />
              <p className={`text-sm ${darkMode ? 'text-amber-200' : 'text-amber-800'}`}>
                {step.tip}
              </p>
            </div>
          )}

          {/* Question Section */}
          {step.question && (
            <div className={`p-5 rounded-xl ${darkMode ? 'bg-neutral-800' : 'bg-neutral-50'}`}>
              <div className="flex items-center gap-2 mb-4">
                <SparkleIcon className={darkMode ? 'text-blue-400' : 'text-blue-600'} size={18} />
                <span className={`text-sm font-semibold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                  Check Your Understanding
                </span>
              </div>
              
              <p className={`font-medium mb-4 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
                {step.question.question}
              </p>

              {/* Multiple Choice */}
              {step.question.type === 'multiple-choice' && (
                <div className="space-y-2">
                  {step.question.options.map((option, index) => {
                    const isSelected = selectedAnswer === index;
                    const mcQuestion = step.question as MultipleChoiceQuestion;
                    const isCorrect = index === mcQuestion.correctIndex;
                    const showResult = showExplanation;
                    
                    let buttonClass = `w-full p-4 rounded-xl text-left transition-all border-2 ${
                      darkMode ? 'border-neutral-700' : 'border-neutral-200'
                    }`;
                    
                    if (showResult) {
                      if (isCorrect) {
                        buttonClass = `w-full p-4 rounded-xl text-left border-2 ${
                          darkMode ? 'bg-emerald-900/30 border-emerald-600 text-emerald-300' : 'bg-emerald-50 border-emerald-500 text-emerald-800'
                        }`;
                      } else if (isSelected && !isCorrect) {
                        buttonClass = `w-full p-4 rounded-xl text-left border-2 ${
                          darkMode ? 'bg-red-900/30 border-red-600 text-red-300' : 'bg-red-50 border-red-500 text-red-800'
                        }`;
                      }
                    } else if (isSelected) {
                      buttonClass = `w-full p-4 rounded-xl text-left border-2 ${
                        darkMode ? 'bg-blue-900/30 border-blue-600 text-blue-300' : 'bg-blue-50 border-blue-500 text-blue-800'
                      }`;
                    } else {
                      buttonClass += ` ${darkMode ? 'hover:bg-neutral-700 text-neutral-300' : 'hover:bg-neutral-100 text-neutral-700'}`;
                    }
                    
                    return (
                      <button
                        key={index}
                        onClick={() => !showExplanation && handleAnswer(index)}
                        disabled={showExplanation}
                        className={buttonClass}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                            darkMode ? 'bg-neutral-700' : 'bg-neutral-200'
                          }`}>
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span>{option}</span>
                          {showResult && isCorrect && <CheckCircleIcon className="ml-auto text-emerald-500" size={20} />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* True/False */}
              {step.question.type === 'true-false' && (
                <div className="flex gap-3">
                  {[true, false].map((value) => {
                    const isSelected = selectedAnswer === value;
                    const isCorrect = value === (step.question as TrueFalseQuestion).correctAnswer;
                    const showResult = showExplanation;
                    
                    let buttonClass = `flex-1 p-4 rounded-xl font-medium transition-all border-2 ${
                      darkMode ? 'border-neutral-700' : 'border-neutral-200'
                    }`;
                    
                    if (showResult) {
                      if (isCorrect) {
                        buttonClass = `flex-1 p-4 rounded-xl font-medium border-2 ${
                          darkMode ? 'bg-emerald-900/30 border-emerald-600 text-emerald-300' : 'bg-emerald-50 border-emerald-500 text-emerald-800'
                        }`;
                      } else if (isSelected && !isCorrect) {
                        buttonClass = `flex-1 p-4 rounded-xl font-medium border-2 ${
                          darkMode ? 'bg-red-900/30 border-red-600 text-red-300' : 'bg-red-50 border-red-500 text-red-800'
                        }`;
                      }
                    } else if (isSelected) {
                      buttonClass = `flex-1 p-4 rounded-xl font-medium border-2 ${
                        darkMode ? 'bg-blue-900/30 border-blue-600 text-blue-300' : 'bg-blue-50 border-blue-500 text-blue-800'
                      }`;
                    } else {
                      buttonClass += ` ${darkMode ? 'hover:bg-neutral-700 text-neutral-300' : 'hover:bg-neutral-100 text-neutral-700'}`;
                    }
                    
                    return (
                      <button
                        key={String(value)}
                        onClick={() => !showExplanation && handleAnswer(value)}
                        disabled={showExplanation}
                        className={buttonClass}
                      >
                        {value ? 'True' : 'False'}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Fill in the Blank */}
              {step.question.type === 'fill-blank' && (
                <div>
                  <input
                    type="text"
                    placeholder="Type your answer..."
                    value={typeof selectedAnswer === 'string' ? selectedAnswer : ''}
                    onChange={(e) => setSelectedAnswer(e.target.value)}
                    disabled={showExplanation}
                    className={`w-full p-4 rounded-xl border-2 transition-all ${
                      showExplanation
                        ? answeredCorrectly
                          ? darkMode ? 'bg-emerald-900/30 border-emerald-600 text-emerald-300' : 'bg-emerald-50 border-emerald-500 text-emerald-800'
                          : darkMode ? 'bg-red-900/30 border-red-600 text-red-300' : 'bg-red-50 border-red-500 text-red-800'
                        : darkMode ? 'bg-neutral-700 border-neutral-600 text-white' : 'bg-white border-neutral-300 text-neutral-900'
                    }`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && selectedAnswer && !showExplanation) {
                        handleAnswer(selectedAnswer);
                      }
                    }}
                  />
                  {!showExplanation && selectedAnswer && (
                    <button
                      onClick={() => handleAnswer(selectedAnswer)}
                      className={`mt-3 px-4 py-2 rounded-lg font-medium ${
                        darkMode ? 'bg-blue-600 text-white' : 'bg-neutral-900 text-white'
                      }`}
                    >
                      Submit Answer
                    </button>
                  )}
                </div>
              )}

              {/* Explanation */}
              {showExplanation && (
                <div className={`mt-4 p-4 rounded-xl ${
                  answeredCorrectly
                    ? darkMode ? 'bg-emerald-900/20' : 'bg-emerald-50'
                    : darkMode ? 'bg-amber-900/20' : 'bg-amber-50'
                }`}>
                  <p className={`text-sm font-medium mb-1 ${
                    answeredCorrectly
                      ? darkMode ? 'text-emerald-400' : 'text-emerald-700'
                      : darkMode ? 'text-amber-400' : 'text-amber-700'
                  }`}>
                    {answeredCorrectly ? '✓ Correct!' : '✗ Not quite right'}
                  </p>
                  <p className={`text-sm ${
                    answeredCorrectly
                      ? darkMode ? 'text-emerald-300' : 'text-emerald-600'
                      : darkMode ? 'text-amber-300' : 'text-amber-600'
                  }`}>
                    {step.question.explanation}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`px-6 py-4 border-t ${darkMode ? 'border-neutral-800' : 'border-neutral-200'}`}>
          <div className="flex items-center justify-between">
            <button
              onClick={goPrev}
              disabled={currentStep === 0}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all ${
                currentStep === 0
                  ? 'opacity-50 cursor-not-allowed'
                  : darkMode ? 'hover:bg-neutral-800 text-neutral-300' : 'hover:bg-neutral-100 text-neutral-600'
              }`}
            >
              <ChevronLeftIcon size={18} />
              <span>Back</span>
            </button>
            
            <div className="flex gap-1.5">
              {lesson.steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentStep
                      ? 'bg-emerald-500 w-4'
                      : completedSteps.has(index)
                        ? 'bg-emerald-400'
                        : darkMode ? 'bg-neutral-700' : 'bg-neutral-300'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={goNext}
              disabled={!canProceed}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all ${
                !canProceed
                  ? 'opacity-50 cursor-not-allowed bg-neutral-200 text-neutral-400'
                  : currentStep === lesson.steps.length - 1
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : darkMode ? 'bg-white text-neutral-900 hover:bg-neutral-100' : 'bg-neutral-900 text-white hover:bg-neutral-800'
              }`}
            >
              <span>{currentStep === lesson.steps.length - 1 ? 'Complete' : 'Continue'}</span>
              <ChevronRightIcon size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaybookLesson;
