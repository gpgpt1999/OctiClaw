/**
 * OctiClaw - 对话页面
 * 类似 OpenClaw 的聊天界面
 */

import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// 模拟欢迎消息
const welcomeMessage: Message = {
  id: 'welcome',
  role: 'assistant',
  content: '你好！我是 OctiClaw，你的 AI Agent 桌面助手 🐙\n\n我可以帮助你完成各种任务，比如：\n- 回答问题和提供建议\n- 编写和审查代码\n- 文件管理和数据处理\n- 自动化工作流\n\n有什么我可以帮你的吗？',
  timestamp: new Date(),
};

export const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 发送消息
  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // 模拟 AI 响应（实际接入 Agent 后替换）
    setTimeout(() => {
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: `收到你的消息："${userMessage.content}"\n\n这是一个模拟回复。实际使用时会连接到 AI Agent 后端。`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  // 按回车发送（Shift+Enter 换行）
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* 消息列表 */}
      <div
        style={{
          flex: 1,
          overflow: 'auto',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        
        {/* 加载指示器 */}
        {isLoading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#E53E3E', padding: '12px' }}>
            <LoadingDots />
            <span style={{ fontSize: '14px' }}>OctiClaw 正在思考...</span>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* 输入区域 */}
      <div
        style={{
          padding: '16px',
          borderTop: '1px solid #FED7D7',
          backgroundColor: '#FFFFFF',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: '12px',
            background: '#FFF5F5',
            borderRadius: '12px',
            border: '1px solid #FEB2B2',
            padding: '12px',
          }}
        >
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入消息... (Shift+Enter 换行)"
            rows={1}
            style={{
              flex: 1,
              border: 'none',
              background: 'transparent',
              resize: 'none',
              outline: 'none',
              fontSize: '14px',
              lineHeight: '1.5',
              maxHeight: '120px',
              fontFamily: 'inherit',
            }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = Math.min(target.scrollHeight, 120) + 'px';
            }}
          />
          <SendButton onClick={handleSend} disabled={!inputValue.trim() || isLoading} />
        </div>
      </div>
    </div>
  );
};

// 消息气泡组件
const MessageBubble: React.FC<{ message: Message }> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
      }}
    >
      <div
        style={{
          maxWidth: '70%',
          padding: '12px 16px',
          borderRadius: '16px',
          backgroundColor: isUser ? '#E53E3E' : '#FFFFFF',
          color: isUser ? '#FFFFFF' : '#1A202C',
          fontSize: '14px',
          lineHeight: '1.6',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          boxShadow: '0 1px 2px rgba(229, 62, 62, 0.1)',
        }}
      >
        {message.content}
      </div>
    </div>
  );
};

// 发送按钮
const SendButton: React.FC<{ onClick: () => void; disabled: boolean }> = ({ onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      width: '40px',
      height: '40px',
      borderRadius: '10px',
      border: 'none',
      background: disabled ? '#FEB2B2' : '#E53E3E',
      cursor: disabled ? 'not-allowed' : 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.15s ease',
    }}
    aria-label="发送"
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 2L11 13"/>
      <path d="M22 2L15 22L11 13L2 9L22 2Z"/>
    </svg>
  </button>
);

// 加载动画
const LoadingDots: React.FC = () => (
  <div style={{ display: 'flex', gap: '4px' }}>
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: '#E53E3E',
          animation: 'bounce 1.4s infinite ease-in-out both',
          animationDelay: `${i * 0.16}s`,
        }}
      />
    ))}
  </div>
);

export default ChatPage;
