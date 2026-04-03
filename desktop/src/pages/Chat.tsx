/**
 * OctiClaw - 瀵硅瘽椤甸潰
 * 绫讳技 OpenClaw 鐨勮亰澶╃晫闈? */

import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// 妯℃嫙娆㈣繋娑堟伅
const welcomeMessage: Message = {
  id: 'welcome',
  role: 'assistant',
  content: '浣犲ソ锛佹垜鏄?OctiClaw锛屼綘鐨?AI Agent 妗岄潰鍔╂墜 馃悪\n\n鎴戝凡缁忔帴鍏ョ湡瀹炵殑 AI 鑳藉姏锛屽彲浠ュ府鍔╀綘锛歕n- 鍥炵瓟闂鍜屾彁渚涘缓璁甛n- 缂栧啓鍜屽鏌ヤ唬鐮乗n- 鏂囦欢绠＄悊鍜屾暟鎹鐞哱n- 鑷姩鍖栧伐浣滄祦\n\n鏈変粈涔堟垜鍙互甯綘鐨勫悧锛?,
  timestamp: new Date(),
};

export const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // 鑷姩婊氬姩鍒板簳閮?  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 鍙戦€佹秷鎭?  const handleSend = async () => {
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

    // 璋冪敤 OpenClaw Gateway 杩涜鐪熷疄 AI 瀵硅瘽
    try {
      const result = await window.electronAPI?.chat?.sendMessage(userMessage.content);
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: result?.success && result.content
          ? result.content
          : result?.error ?? '鎶辨瓑锛孉I 鏈嶅姟鏆傛椂涓嶅彲鐢紝璇风‘淇?OpenClaw Gateway 姝ｅ湪杩愯銆?,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: '鎶辨瓑锛屽彂閫佹秷鎭椂鍑虹幇閿欒锛岃閲嶈瘯銆?,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // 鎸夊洖杞﹀彂閫侊紙Shift+Enter 鎹㈣锛?  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* 娑堟伅鍒楄〃 */}
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
        
        {/* 鍔犺浇鎸囩ず鍣?*/}
        {isLoading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#E53E3E', padding: '12px' }}>
            <LoadingDots />
            <span style={{ fontSize: '14px' }}>OctiClaw 姝ｅ湪鎬濊€?..</span>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* 杈撳叆鍖哄煙 */}
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
            placeholder="杈撳叆娑堟伅... (Shift+Enter 鎹㈣)"
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

// 娑堟伅姘旀场缁勪欢
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

// 鍙戦€佹寜閽?const SendButton: React.FC<{ onClick: () => void; disabled: boolean }> = ({ onClick, disabled }) => (
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
    aria-label="鍙戦€?
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 2L11 13"/>
      <path d="M22 2L15 22L11 13L2 9L22 2Z"/>
    </svg>
  </button>
);

// 鍔犺浇鍔ㄧ敾
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
