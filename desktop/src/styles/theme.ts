/**
 * OctiClaw 主题配置
 * 红色系配色方案 - 活泼热情的品牌风格
 */

export const theme = {
  colors: {
    // 主色系
    primary: {
      50:  '#FFF5F5',  // 最浅红背景
      100: '#FED7D7',  // 浅红
      200: '#FEB2B2',  // 亮红
      300: '#FC8181',  // 橙红
      400: '#F56565',  // 鲜艳红
      500: '#E53E3E',  // 品牌主色
      600: '#C53030',  // 深红
      700: '#9B2C2C',  // 暗红
      800: '#822727',  // 酒红
      900: '#63171B',  // 深酒红
    },
    
    // 强调色
    accent: {
      yellow:  '#F6AD55',  // 温暖橙黄（八爪鱼眼睛）
      orange:  '#ED8936',  // 橙色
      purple:  '#805AD5',  // 紫色（备用）
    },
    
    // 背景色
    background: {
      default: '#FFF5F5',  // 默认红色浅底
      card:    '#FFFFFF',  // 卡片白色
      sidebar: '#E53E3E',  // 侧边栏红色
      hover:   '#FC8181',  // 悬停状态
    },
    
    // 文字色
    text: {
      primary:   '#1A202C',  // 深灰黑
      secondary: '#4A5568',  // 中灰
      muted:     '#A0AEC0',  // 浅灰
      inverse:   '#FFFFFF',  // 白色（用于深色背景上）
    },
    
    // 边框
    border: {
      light: '#FED7D7',
      DEFAULT: '#E2E8F0',
    },
    
    // 状态色
    state: {
      success: '#48BB78',  // 绿色
      warning: '#ED8936',  // 橙色
      error:   '#F56565',  // 红色
      info:    '#4299E1',  // 蓝色
    },
  },
  
  // 字体
  font: {
    sans: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ],
    mono: [
      '"Fira Code"',
      '"Cascadia Code"',
      'Consolas',
      '"Courier New"',
      'monospace',
    ],
  },
  
  // 阴影
  shadows: {
    sm:  '0 1px 2px 0 rgba(229, 62, 62, 0.05)',
    DEFAULT: '0 1px 3px 0 rgba(229, 62, 62, 0.1), 0 1px 2px 0 rgba(229, 62, 62, 0.06)',
    md: '0 4px 6px -1px rgba(229, 62, 62, 0.1), 0 2px 4px -1px rgba(229, 62, 62, 0.06)',
    lg: '0 10px 15px -3px rgba(229, 62, 62, 0.1), 0 4px 6px -2px rgba(229, 62, 62, 0.05)',
    xl: '0 20px 25px -5px rgba(229, 62, 62, 0.1), 0 10px 10px -5px rgba(229, 62, 62, 0.04)',
  },
  
  // 圆角
  radii: {
    none: '0',
    sm:   '0.125rem',
    DEFAULT: '0.375rem',
    md:   '0.5rem',
    lg:   '0.75rem',
    xl:   '1rem',
    full: '9999px',
  },
  
  // 过渡动画
  transitions: {
    fast:   'all 0.15s ease',
    DEFAULT: 'all 0.2s ease',
    slow:   'all 0.3s ease',
  },
};

// 八爪鱼吉祥物 SVG（简化版，用于标题栏等）
export const octopusSvg = `
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <!-- 头部 -->
  <ellipse cx="50" cy="40" rx="28" ry="24" fill="#E53E3E"/>
  <!-- 眼睛 -->
  <circle cx="40" cy="36" r="6" fill="white"/>
  <circle cx="60" cy="36" r="6" fill="white"/>
  <circle cx="42" cy="36" r="3" fill="#1A202C"/>
  <circle cx="62" cy="36" r="3" fill="#1A202C"/>
  <circle cx="43" cy="35" r="1" fill="white"/>
  <circle cx="63" cy="35" r="1" fill="white"/>
  <!-- 微笑 -->
  <path d="M 42 48 Q 50 54 58 48" stroke="#C53030" stroke-width="2" fill="none" stroke-linecap="round"/>
  <!-- 触手 -->
  <path d="M 22 55 Q 15 70 18 85" stroke="#E53E3E" stroke-width="8" fill="none" stroke-linecap="round"/>
  <path d="M 32 58 Q 28 75 30 90" stroke="#E53E3E" stroke-width="8" fill="none" stroke-linecap="round"/>
  <path d="M 44 60 Q 44 78 42 92" stroke="#E53E3E" stroke-width="8" fill="none" stroke-linecap="round"/>
  <path d="M 56 60 Q 56 78 58 92" stroke="#E53E3E" stroke-width="8" fill="none" stroke-linecap="round"/>
  <path d="M 68 58 Q 72 75 70 90" stroke="#E53E3E" stroke-width="8" fill="none" stroke-linecap="round"/>
  <path d="M 78 55 Q 85 70 82 85" stroke="#E53E3E" stroke-width="8" fill="none" stroke-linecap="round"/>
  <!-- 腮红 -->
  <ellipse cx="30" cy="46" rx="5" ry="3" fill="#FC8181" opacity="0.6"/>
  <ellipse cx="70" cy="46" rx="5" ry="3" fill="#FC8181" opacity="0.6"/>
</svg>
`;

export default theme;
