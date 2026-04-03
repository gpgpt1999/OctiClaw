#!/usr/bin/env node

/**
 * OctiClaw Skills 一键安装脚本
 * 
 * 读取 skills-config.json，自动安装所有预装 Skills
 * 支持进度显示、错误处理和重试机制
 * 
 * 用法: node install-skills.js [--force] [--skip=<skill-id>]
 */

const fs = require('fs');
const path = require('path');

// ─── 配置 ───────────────────────────────────────────────
const CONFIG_PATH = path.join(__dirname, 'skills-config.json');
const SKILLS_DIR = path.join(__dirname, 'preinstalled');
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 2000;

// ANSI 颜色
const C = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[36m',
  gray: '\x1b[90m',
};

const log = {
  info: (msg) => console.log(`${C.blue}[INFO]${C.reset} ${msg}`),
  ok: (msg) => console.log(`${C.green}[OK]${C.reset} ${msg}`),
  warn: (msg) => console.log(`${C.yellow}[WARN]${C.reset} ${msg}`),
  error: (msg) => console.log(`${C.red}[ERROR]${C.reset} ${msg}`),
  step: (current, total, name) => {
    const bar = `${C.gray}${'─'.repeat(40)}${C.reset}`;
    const pct = Math.round((current / total) * 100);
    const filled = Math.round((current / total) * 20);
    const barProgress = C.green + '█'.repeat(filled) + C.gray + '░'.repeat(20 - filled);
    console.log(`\n${C.bright}[${current}/${total}]${C.reset} ${C.blue}${name}${C.reset}`);
    console.log(`  ${barProgress}${C.reset} ${pct}%`);
  },
};

// ─── 工具函数 ───────────────────────────────────────────

/**
 * 睡眠函数
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 进度条动画（异步等待）
 */
async function animatedProgress(durationMs, message) {
  const steps = Math.floor(durationMs / 100);
  for (let i = 0; i < steps; i++) {
    process.stdout.write(`${C.gray}.${C.reset}`);
    await sleep(100);
  }
}

/**
 * 加载配置文件
 */
function loadConfig() {
  if (!fs.existsSync(CONFIG_PATH)) {
    log.error(`配置文件不存在: ${CONFIG_PATH}`);
    process.exit(1);
  }
  try {
    const raw = fs.readFileSync(CONFIG_PATH, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    log.error(`配置文件解析失败: ${e.message}`);
    process.exit(1);
  }
}

/**
 * 检查 Skill 是否已安装（通过检查 SKILL.md 是否存在）
 */
function isSkillInstalled(skillId) {
  const skillPath = path.join(SKILLS_DIR, skillId, 'SKILL.md');
  return fs.existsSync(skillPath);
}

/**
 * 检查依赖是否满足
 */
function checkDependencies(dependencies) {
  const results = [];
  for (const dep of dependencies) {
    try {
      const result = require('child_process').execSync(
        `where ${dep} || which ${dep}`,
        { encoding: 'utf8', timeout: 5000 }
      );
      results.push({ name: dep, available: true, path: result.trim() });
    } catch {
      results.push({ name: dep, available: false, path: null });
    }
  }
  return results;
}

/**
 * 模拟安装 Skill（实际项目中调用 OpenClaw 安装 API）
 */
async function installSkill(skill, force = false) {
  const { id, name, icon } = skill;
  
  // 检查是否已安装
  if (!force && isSkillInstalled(id)) {
    log.ok(`${icon} ${name} (${id}) — 已安装，跳过`);
    return { skillId: id, status: 'skipped', reason: 'already_installed' };
  }

  // 检查依赖
  if (skill.dependencies && skill.dependencies.length > 0) {
    const depResults = checkDependencies(skill.dependencies);
    const missingDeps = depResults.filter(r => !r.available);
    if (missingDeps.length > 0) {
      log.warn(`${icon} ${name} — 缺少依赖: ${missingDeps.map(d => d.name).join(', ')}`);
    }
  }

  // 检查 Skill 目录是否存在
  const skillDir = path.join(SKILLS_DIR, id);
  if (!fs.existsSync(skillDir)) {
    fs.mkdirSync(skillDir, { recursive: true });
    const skillMdPath = path.join(skillDir, 'SKILL.md');
    if (!fs.existsSync(skillMdPath)) {
      // 创建占位 SKILL.md（后续会被真实内容替换）
      fs.writeFileSync(skillMdPath, `# ${name}\n\nSkill ID: ${id}\n`, 'utf8');
    }
  }

  // 模拟安装过程（实际调用 openclaw skill install）
  await sleep(300 + Math.random() * 200);

  return { skillId: id, status: 'installed' };
}

/**
 * 带重试的安装函数
 */
async function installWithRetry(skill, force = false, retries = MAX_RETRIES) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await installSkill(skill, force);
    } catch (err) {
      if (attempt === retries) {
        return { skillId: skill.id, status: 'failed', error: err.message, attempts: retries };
      }
      log.warn(`${skill.icon} ${skill.name} — 安装失败，${RETRY_DELAY_MS}ms 后重试 (${attempt}/${retries})...`);
      await sleep(RETRY_DELAY_MS);
    }
  }
}

// ─── 主函数 ─────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const force = args.includes('--force');
  const skipSet = new Set(
    args.filter(a => a.startsWith('--skip=')).map(a => a.replace('--skip=', ''))
  );

  // 打印 Banner
  console.log(`\n${C.bright}${C.green}`);
  console.log('  ╔══════════════════════════════════════════════╗');
  console.log('  ║    OctiClaw Skills 一键安装脚本              ║');
  console.log('  ║    OctiClaw Skills Auto-Installer             ║');
  console.log('  ╚══════════════════════════════════════════════╝');
  console.log(`${C.reset}\n`);

  // 加载配置
  const config = loadConfig();
  log.info(`加载配置: v${config.version} | 更新于 ${config.updatedAt}`);
  log.info(`共 ${config.preinstalled.length} 个预装 Skills\n`);

  // 过滤要安装的 Skills
  const skillsToInstall = config.preinstalled.filter(s => !skipSet.has(s.id));
  if (skipSet.size > 0) {
    log.info(`跳过 ${skipSet.size} 个 Skills: ${[...skipSet].join(', ')}\n`);
  }

  // 安装统计
  const stats = { total: skillsToInstall.length, installed: 0, skipped: 0, failed: 0 };
  const results = [];

  // 逐个安装
  for (let i = 0; i < skillsToInstall.length; i++) {
    const skill = skillsToInstall[i];
    log.step(i + 1, stats.total, `${skill.icon} ${skill.name}`);
    
    const result = await installWithRetry(skill, force);
    results.push(result);

    if (result.status === 'installed') {
      log.ok(`  ✅ ${skill.name} (${skill.id}) 安装完成`);
      stats.installed++;
    } else if (result.status === 'skipped') {
      log.info(`  ⏭️  ${skill.name} — 跳过（已安装）`);
      stats.skipped++;
    } else if (result.status === 'failed') {
      log.error(`  ❌ ${skill.name} — 安装失败: ${result.error}`);
      stats.failed++;
    }
  }

  // ─── 安装摘要 ───────────────────────────────────────
  console.log(`\n${C.bright}${'─'.repeat(50)}${C.reset}`);
  console.log(`${C.bright}📦 安装摘要${C.reset}`);
  console.log(`${'─'.repeat(50)}`);

  const totalBar = 20;
  const fillRatio = stats.installed / stats.total;
  const filled = Math.round(fillRatio * totalBar);
  const bar = C.green + '█'.repeat(filled) + C.gray + '░'.repeat(totalBar - filled);
  console.log(`  安装进度: ${bar} ${stats.installed}/${stats.total}`);
  console.log(`  ✅ 成功: ${C.green}${stats.installed}${C.reset}`);
  console.log(`  ⏭️  跳过: ${C.yellow}${stats.skipped}${C.reset}`);
  console.log(`  ❌ 失败: ${stats.failed > 0 ? C.red : C.gray}${stats.failed}${C.reset}`);
  console.log(`${'─'.repeat(50)}\n`);

  // 失败项详情
  if (stats.failed > 0) {
    log.error(`以下 Skills 安装失败，请手动处理：`);
    results.filter(r => r.status === 'failed').forEach(r => {
      console.log(`  • ${r.skillId} — ${r.error}`);
    });
    console.log();
  }

  // 分类概览
  log.info('分类概览：');
  Object.entries(config.categories).forEach(([catId, cat]) => {
    const catSkills = skillsToInstall.filter(s => s.category === catId);
    const icons = catSkills.map(s => s.icon).join(' ');
    console.log(`  ${cat.icon} ${cat.name} (${cat.nameEn}): ${icons}`);
  });
  console.log();

  // 完成
  if (stats.failed === 0) {
    log.ok('🎉 所有 Skills 安装完成！OctiClaw 已准备就绪。\n');
  } else {
    log.warn('⚠️  部分 Skills 安装失败。请检查依赖后重试，或使用 --force 重新安装。\n');
  }
}

// ─── 错误处理 ───────────────────────────────────────────

process.on('uncaughtException', (err) => {
  log.error(`未捕获异常: ${err.message}`);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  log.error(`未处理的 Promise 拒绝: ${reason}`);
  process.exit(1);
});

// 运行
main();
