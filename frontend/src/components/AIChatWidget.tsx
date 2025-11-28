import { useState, useRef, useEffect } from 'react';
import { Send, Bot, X } from 'lucide-react';
import api from '../lib/api';
import { toast } from 'react-hot-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIChatWidgetProps {
  articleId?: string;
}

const AIChatWidget = ({ articleId }: AIChatWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Assuming there's an AI chat endpoint
      const { data } = await api.post('/ai/chat', {
        message: input,
        articleId,
        conversationHistory: messages,
      });

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response || 'Sorry, I could not process your request.',
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to get AI response');
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Bubble */}
      {!isOpen && (
        <button
          className="fixed bottom-6 right-6 btn btn-circle btn-primary shadow-lg z-50"
          onClick={() => setIsOpen(true)}
          aria-label="Open AI chat"
        >
          <Bot className="h-6 w-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-base-100 shadow-2xl rounded-lg flex flex-col z-50 border border-base-300">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-base-300">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              <h3 className="font-bold">AI Assistant</h3>
            </div>
            <button
              className="btn btn-ghost btn-sm btn-circle"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-base-content/70 py-8">
                <Bot className="h-12 w-12 mx-auto mb-2 text-primary" />
                <p>Ask me anything about this article!</p>
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      msg.role === 'user'
                        ? 'bg-primary text-primary-content'
                        : 'bg-base-200'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-base-200 rounded-lg p-3">
                  <span className="loading loading-dots loading-sm"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-base-300">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ask a question..."
                className="input input-bordered flex-1"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
              />
              <button
                className="btn btn-primary"
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatWidget;

