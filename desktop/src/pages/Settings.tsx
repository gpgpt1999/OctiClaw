/**
 * OctiClaw - 设置页面
 */

import React, { useState, useEffect } from 'react';

interface SettingsState {
  theme: 'light' | 'dark' | 'system';
  language: string;
  autoStart: boolean;
  minimizeToTray: boolean;
  notifications: boolean;
  siliconflowApiKey: string;
  aiModel: string;
  availableModels: string[];
}

export const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<SettingsState>({
    theme: 'light',
    language: 'zh-CN',
    autoStart: false,
    minimizeToTray: true,
    notifications: true,
    siliconflowApiKey: '',
    aiModel: 'Qwen/Qwen2.5-7B-Instruct',
    availableModels: [],
  });
  const [version, setVersion] = useState('0.1.0');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.app.getVersion().then(setVersion);
      window.electronAPI.settings?.getAvailableModels().then((models) => {
        setSettings((prev) => ({ ...prev, availableModels: models }));
      });
      window.electronAPI.settings?.get().then((cfg) => {
        setSettings((prev) => ({
          ...prev,
          siliconflowApiKey: cfg.siliconflowApiKey,
          aiModel: cfg.aiModel,
          theme: cfg.theme as SettingsState['theme'],
          language: cfg.language,
          autoStart: cfg.autoStart,
          minimizeToTray: cfg.minimizeToTray,
          notifications: cfg.notifications,
        }));
      });
    }
  }, []);

  const handleSave = async () => {
    // 保存设置到本地存储
    localStorage.setItem('octiclaw-settings', JSON.stringify(settings));
    // 同步到 main 进程（API Key 等敏感配置）
    if (window.electronAPI) {
      await window.electronAPI.settings?.set({
        siliconflowApiKey: settings.siliconflowApiKey,
        aiModel: settings.aiModel,
        theme: settings.theme,
        language: settings.language,
        autoStart: String(settings.autoStart),
        minimizeToTray: String(settings.minimizeToTray),
        notifications: String(settings.notifications),
      });
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '16px', overflow: 'auto' }}>
      {/* 标题 */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#E53E3E', margin: '0 0 4px 0' }}>
          设置
        </h2>
        <p style={{ fontSize: '13px', color: '#A0AEC0', margin: 0 }}>
          自定义你的 OctiClaw 体验
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
        {/* 外观 */}
        <SettingsSection title="外观">
          <SettingsRow label="主题" description="选择应用主题">
            <select
              value={settings.theme}
              onChange={(e) => setSettings({ ...settings, theme: e.target.value as SettingsState['theme'] })}
              style={selectStyle}
            >
              <option value="light">🌤️ 浅色</option>
              <option value="dark">🌙 深色</option>
              <option value="system">💻 跟随系统</option>
            </select>
          </SettingsRow>
          <SettingsRow label="语言" description="选择界面语言">
            <select
              value={settings.language}
              onChange={(e) => setSettings({ ...settings, language: e.target.value })}
              style={selectStyle}
            >
              <option value="zh-CN">简体中文</option>
              <option value="en-US">English</option>
            </select>
          </SettingsRow>
        </SettingsSection>

        {/* SiliconFlow API 配置 */}
        <SettingsSection title="SiliconFlow AI（免费）">
          <div style={{ padding: '12px 0' }}>
            <div style={{ fontSize: '12px', color: '#A0AEC0', marginBottom: '8px' }}>
              使用 SiliconFlow 免费模型（Qwen2.5-7B-Instruct）进行 AI 对话。
              <br />
              <a href="https://cloud.siliconflow.cn" target="_blank" rel="noopener noreferrer" style={{ color: '#E53E3E' }}>
                点击这里免费注册获取 API Key →
              </a>
            </div>
            <div style={{ marginBottom: '8px' }}>
              <label style={{ fontSize: '13px', fontWeight: 500, color: '#1A202C', display: 'block', marginBottom: '4px' }}>API Key</label>
              <input
                type="password"
                value={settings.siliconflowApiKey}
                onChange={(e) => setSettings({ ...settings, siliconflowApiKey: e.target.value })}
                placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxx"
                style={{
                  ...inputStyle,
                  width: '100%',
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 500, color: '#1A202C', display: 'block', marginBottom: '4px' }}>免费模型</label>
              <select
                value={settings.aiModel}
                onChange={(e) => setSettings({ ...settings, aiModel: e.target.value })}
                style={{ ...selectStyle, width: '100%' }}
              >
                {settings.availableModels.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>
        </SettingsSection>

        {/* 模型 */}
        <SettingsSection title="AI 模型">
          <div style={{ fontSize: '12px', color: '#A0AEC0', padding: '8px 0' }}>
            ✓ 已配置 SiliconFlow 免费 AI 模型，无需额外设置。
          </div>
        </SettingsSection>

        {/* 行为 */}
        <SettingsSection title="行为">
          <SettingsRow label="开机自启" description="登录时自动启动 OctiClaw">
            <ToggleSwitch
              checked={settings.autoStart}
              onChange={(checked) => setSettings({ ...settings, autoStart: checked })}
            />
          </SettingsRow>
          <SettingsRow label="最小化到托盘" description="关闭窗口时最小化到系统托盘">
            <ToggleSwitch
              checked={settings.minimizeToTray}
              onChange={(checked) => setSettings({ ...settings, minimizeToTray: checked })}
            />
          </SettingsRow>
          <SettingsRow label="通知" description="允许应用发送桌面通知">
            <ToggleSwitch
              checked={settings.notifications}
              onChange={(checked) => setSettings({ ...settings, notifications: checked })}
            />
          </SettingsRow>
        </SettingsSection>

        {/* 保存按钮 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '8px' }}>
          <button
            onClick={handleSave}
            style={{
              padding: '10px 24px',
              borderRadius: '8px',
              border: 'none',
              background: '#E53E3E',
              color: '#FFFFFF',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 600,
              transition: 'all 0.15s ease',
            }}
          >
            保存设置
          </button>
          {saved && (
            <span style={{ fontSize: '13px', color: '#48BB78', display: 'flex', alignItems: 'center', gap: '4px' }}>
              ✓ 已保存
            </span>
          )}
        </div>

        {/* 关于 */}
        <SettingsSection title="关于">
          <div style={{ padding: '12px 0', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div dangerouslySetInnerHTML={{ __html: getOctopusSVG() }} style={{ width: '48px', height: '48px' }} />
            <div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#E53E3E' }}>OctiClaw</div>
              <div style={{ fontSize: '12px', color: '#A0AEC0' }}>版本 {version}</div>
              <div style={{ fontSize: '11px', color: '#CBD5E0', marginTop: '4px' }}>
                AI Agent 桌面软件 · Built with Electron + React
              </div>
            </div>
          </div>
        </SettingsSection>
      </div>
    </div>
  );
};

// 设置区块
const SettingsSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #FED7D7', padding: '16px' }}>
    <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#E53E3E', margin: '0 0 12px 0' }}>{title}</h3>
    <div style={{ display: 'flex', flexDirection: 'column' }}>{children}</div>
  </div>
);

// 单行设置项
const SettingsRow: React.FC<{ label: string; description: string; children: React.ReactNode }> = ({ label, description, children }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F7FAFC' }}>
    <div>
      <div style={{ fontSize: '14px', fontWeight: 500, color: '#1A202C' }}>{label}</div>
      <div style={{ fontSize: '12px', color: '#A0AEC0' }}>{description}</div>
    </div>
    {children}
  </div>
);

// 开关
const ToggleSwitch: React.FC<{ checked: boolean; onChange: (checked: boolean) => void }> = ({ checked, onChange }) => (
  <button
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    style={{
      width: '44px',
      height: '24px',
      borderRadius: '12px',
      border: 'none',
      background: checked ? '#E53E3E' : '#E2E8F0',
      cursor: 'pointer',
      position: 'relative',
      transition: 'background 0.2s ease',
    }}
  >
    <span
      style={{
        position: 'absolute',
        top: '2px',
        left: checked ? '22px' : '2px',
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        background: '#FFFFFF',
        transition: 'left 0.2s ease',
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
      }}
    />
  </button>
);

const selectStyle: React.CSSProperties = {
  padding: '6px 12px',
  borderRadius: '6px',
  border: '1px solid #FED7D7',
  background: '#FFF5F5',
  color: '#1A202C',
  fontSize: '13px',
  cursor: 'pointer',
  outline: 'none',
};

const inputStyle: React.CSSProperties = {
  padding: '6px 12px',
  borderRadius: '6px',
  border: '1px solid #FED7D7',
  background: '#FFF5F5',
  color: '#1A202C',
  fontSize: '13px',
  outline: 'none',
  fontFamily: 'inherit',
};

function getOctopusSVG() {
  return `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="40" rx="28" ry="24" fill="#E53E3E"/>
      <circle cx="40" cy="36" r="6" fill="white"/>
      <circle cx="60" cy="36" r="6" fill="white"/>
      <circle cx="42" cy="36" r="3" fill="#1A202C"/>
      <circle cx="62" cy="36" r="3" fill="#1A202C"/>
      <circle cx="43" cy="35" r="1.2" fill="white"/>
      <circle cx="63" cy="35" r="1.2" fill="white"/>
      <path d="M 42 48 Q 50 54 58 48" stroke="#C53030" stroke-width="2" fill="none" stroke-linecap="round"/>
      <path d="M 22 55 Q 15 70 18 85" stroke="#E53E3E" stroke-width="8" fill="none" stroke-linecap="round"/>
      <path d="M 32 58 Q 28 75 30 90" stroke="#E53E3E" stroke-width="8" fill="none" stroke-linecap="round"/>
      <path d="M 44 60 Q 44 78 42 92" stroke="#E53E3E" stroke-width="8" fill="none" stroke-linecap="round"/>
      <path d="M 56 60 Q 56 78 58 92" stroke="#E53E3E" stroke-width="8" fill="none" stroke-linecap="round"/>
      <path d="M 68 58 Q 72 75 70 90" stroke="#E53E3E" stroke-width="8" fill="none" stroke-linecap="round"/>
      <path d="M 78 55 Q 85 70 82 85" stroke="#E53E3E" stroke-width="8" fill="none" stroke-linecap="round"/>
      <ellipse cx="30" cy="46" rx="5" ry="3" fill="#FC8181" opacity="0.7"/>
      <ellipse cx="70" cy="46" rx="5" ry="3" fill="#FC8181" opacity="0.7"/>
    </svg>
  `;
}

export default SettingsPage;
