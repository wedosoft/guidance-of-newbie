
import React, { useState, useCallback } from 'react';
import { Scenario, Choice, ChatMessage } from './types';
import { SCENARIOS } from './constants';
import { getFeedback, getChatResponse } from './services/geminiService';
import Header from './components/Header';
import ScenarioCard from './components/ScenarioCard';
import FeedbackModal from './components/FeedbackModal';
import CompletionScreen from './components/CompletionScreen';
import Chatbot from './components/Chatbot';

const App: React.FC = () => {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // New states for chat
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    { role: 'model', content: '안녕하세요! 저는 당신의 AI 시니어 멘토입니다. 업무 중 궁금한 점이나 어려운 점이 있다면 언제든지 물어보세요.' }
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);


  const currentScenario = SCENARIOS[currentScenarioIndex];

  const handleChoiceSelect = useCallback(async (choice: Choice) => {
    if (!currentScenario) return;

    setIsLoading(true);
    setSelectedChoice(choice);
    setFeedback('');

    try {
      const aiFeedback = await getFeedback(currentScenario, choice);
      setFeedback(aiFeedback);
    } catch (error) {
      console.error(error);
      setFeedback('죄송합니다, 피드백을 받는 중 오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setIsLoading(false);
      setIsFeedbackVisible(true);
    }
  }, [currentScenario]);

  const handleNextScenario = () => {
    setIsFeedbackVisible(false);
    setSelectedChoice(null);
    setFeedback('');
    if (currentScenarioIndex < SCENARIOS.length - 1) {
      setCurrentScenarioIndex(prevIndex => prevIndex + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentScenarioIndex(0);
    setSelectedChoice(null);
    setFeedback('');
    setIsFeedbackVisible(false);
    setIsCompleted(false);
  };

  const handleSendMessage = useCallback(async (message: string) => {
    // Add user message to history
    setChatHistory(prev => [...prev, { role: 'user', content: message }]);
    setIsChatLoading(true);

    try {
      const aiResponse = await getChatResponse(message);
      setChatHistory(prev => [...prev, { role: 'model', content: aiResponse }]);
    } catch (error) {
      console.error(error);
      const errorMessage = '죄송합니다. 답변을 생성하는 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.';
      setChatHistory(prev => [...prev, { role: 'model', content: errorMessage }]);
    } finally {
      setIsChatLoading(false);
    }
  }, []);


  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 transition-colors duration-300">
      <Header />
      <main className="w-full max-w-2xl mx-auto">
        {isCompleted ? (
          <CompletionScreen onRestart={handleRestart} />
        ) : currentScenario ? (
          <ScenarioCard
            scenario={currentScenario}
            onSelectChoice={handleChoiceSelect}
            isLoading={isLoading}
            selectedChoiceId={selectedChoice?.id ?? null}
          />
        ) : (
           <p>시나리오를 불러오지 못했습니다.</p>
        )}
      </main>
      
      {isFeedbackVisible && (
        <FeedbackModal
          isOpen={isFeedbackVisible}
          onClose={() => setIsFeedbackVisible(false)}
          feedback={feedback}
          onNext={handleNextScenario}
          isLoading={isLoading && !feedback}
        />
      )}

      <Chatbot 
        history={chatHistory}
        onSendMessage={handleSendMessage}
        isLoading={isChatLoading}
      />
    </div>
  );
};

export default App;
