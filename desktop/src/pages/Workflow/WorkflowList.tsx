/**
 * WorkflowList - 工作流列表页面
 * 显示所有已保存的工作流，提供创建/编辑/删除/运行操作
 * 包含预设模板（内容创作流水线/代码开发流水线/数据分析流水线）
 */

import React, { useState } from 'react';

// 类型定义
import { WorkflowConfig, WorkflowTemplate } from './workflow.types';

// 状态管理
import { useWorkflowStore } from './workflow.store';

// 样式
import './workflow.css';

/**
 * 预设模板数据
 */
const presetTemplates: WorkflowTemplate[] = [
  {
    id: 'template-content',
    name: '内容创作流水线',
    description: '自动化内容创作流程：研究 → 写作 → 排版 → 发布',
    category: 'content',
    nodes: [],
    edges: []
  },
  {
    id: 'template-dev',
    name: '代码开发流水线',
    description: '完整软件开发流程：需求分析 → 架构设计 → 编码 → 测试 → 文档',
    category: 'development',
    nodes: [],
    edges: []
  },
  {
    id: 'template-dapp',
    name: 'DAPP 开发流水线',
    description: '去中心化应用开发：需求分析 → 合约设计 → 合约开发 → 前端开发 → 测试部署',
    category: 'dapp',
    nodes: [],
    edges: []
  }
];

/**
 * 模板分类图标
 */
const categoryIcons: Record<string, string> = {
  content: '📝',
  development: '💻',
  dapp: '⛓️',
  custom: '🔧'
};

/**
 * 模板分类颜色
 */
const categoryColors: Record<string, string> = {
  content: '#e53935',
  development: '#1e88e5',
  dapp: '#7b1fa2',
  custom: '#43a047'
};

/**
 * WorkflowList 组件
 */
const WorkflowList: React.FC = () => {
  // 从 Store 获取状态
  const { 
    workflows, 
    templates,
    loadTemplate,
    setCurrentWorkflow,
    addWorkflow,
    deleteWorkflow,
    runStatus,
    setRunStatus
  } = useWorkflowStore();

  // 本地状态
  const [activeTab, setActiveTab] = useState<'workflows' | 'templates'>('workflows');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newWorkflowName, setNewWorkflowName] = useState('');
  const [newWorkflowDesc, setNewWorkflowDesc] = useState('');

  /**
   * 创建新工作流
   */
  const createWorkflow = () => {
    if (!newWorkflowName.trim()) {
      alert('请输入工作流名称');
      return;
    }

    const newWorkflow: WorkflowConfig = {
      id: `workflow-${Date.now()}`,
      name: newWorkflowName,
      description: newWorkflowDesc,
      nodes: [],
      edges: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isTemplate: false
    };

    addWorkflow(newWorkflow);
    setCurrentWorkflow(newWorkflow);
    setShowCreateModal(false);
    setNewWorkflowName('');
    setNewWorkflowDesc('');
  };

  /**
   * 从模板创建工作流
   */
  const createFromTemplate = (template: WorkflowTemplate) => {
    loadTemplate(template);
  };

  /**
   * 编辑工作流
   */
  const editWorkflow = (workflow: WorkflowConfig) => {
    setCurrentWorkflow(workflow);
  };

  /**
   * 删除工作流
   */
  const handleDeleteWorkflow = (id: string) => {
    if (confirm('确定要删除这个工作流吗?')) {
      deleteWorkflow(id);
    }
  };

  /**
   * 运行工作流
   */
  const runWorkflow = (workflow: WorkflowConfig) => {
    setCurrentWorkflow(workflow);
    // 模拟运行
    setRunStatus({
      workflowId: workflow.id,
      status: 'running',
      startTime: new Date().toISOString()
    });
    
    setTimeout(() => {
      setRunStatus({
        workflowId: workflow.id,
        status: 'completed',
        startTime: new Date().toISOString(),
        endTime: new Date().toISOString()
      });
      alert(`工作流 "${workflow.name}" 运行完成!`);
    }, 2000);
  };

  /**
   * 格式化日期
   */
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="workflow-list-container">
      {/* 页面头部 */}
      <div className="workflow-list-header">
        <h1 className="page-title">工作流管理</h1>
        <button 
          className="create-btn"
          onClick={() => setShowCreateModal(true)}
        >
          + 创建工作流
        </button>
      </div>

      {/* Tab 切换 */}
      <div className="workflow-tabs">
        <button 
          className={`tab-btn ${activeTab === 'workflows' ? 'active' : ''}`}
          onClick={() => setActiveTab('workflows')}
        >
          我的工作流
          {workflows.length > 0 && (
            <span className="tab-badge">{workflows.length}</span>
          )}
        </button>
        <button 
          className={`tab-btn ${activeTab === 'templates' ? 'active' : ''}`}
          onClick={() => setActiveTab('templates')}
        >
          预设模板
        </button>
      </div>

      {/* 内容区域 */}
      <div className="workflow-content">
        {/* 工作流列表 */}
        {activeTab === 'workflows' && (
          <div className="workflow-grid">
            {workflows.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📋</div>
                <h3>暂无工作流</h3>
                <p>点击上方"创建工作流"开始创建，或从模板快速开始</p>
              </div>
            ) : (
              workflows.map((workflow) => (
                <div key={workflow.id} className="workflow-card">
                  <div className="card-header">
                    <h3 className="card-title">{workflow.name}</h3>
                    <span className="card-badge">
                      {workflow.nodes.length} 节点
                    </span>
                  </div>
                  
                  <p className="card-description">
                    {workflow.description || '暂无描述'}
                  </p>
                  
                  <div className="card-meta">
                    <span>创建于: {formatDate(workflow.createdAt)}</span>
                    <span>更新于: {formatDate(workflow.updatedAt)}</span>
                  </div>
                  
                  <div className="card-actions">
                    <button 
                      className="card-btn edit"
                      onClick={() => editWorkflow(workflow)}
                    >
                      ✏️ 编辑
                    </button>
                    <button 
                      className="card-btn run"
                      onClick={() => runWorkflow(workflow)}
                      disabled={runStatus.status === 'running'}
                    >
                      ▶️ 运行
                    </button>
                    <button 
                      className="card-btn delete"
                      onClick={() => handleDeleteWorkflow(workflow.id)}
                    >
                      🗑️ 删除
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* 模板列表 */}
        {activeTab === 'templates' && (
          <div className="template-grid">
            {presetTemplates.map((template) => (
              <div 
                key={template.id} 
                className="template-card"
                style={{ borderColor: categoryColors[template.category] }}
              >
                <div className="template-icon">
                  {categoryIcons[template.category]}
                </div>
                <h3 className="template-name">{template.name}</h3>
                <p className="template-description">{template.description}</p>
                <div 
                  className="template-category"
                  style={{ background: categoryColors[template.category] }}
                >
                  {categoryIcons[template.category]} {template.category}
                </div>
                <button 
                  className="template-btn"
                  onClick={() => createFromTemplate(template)}
                >
                  使用模板创建
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 创建工作流弹窗 */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>创建新工作流</h2>
              <button 
                className="modal-close"
                onClick={() => setShowCreateModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>工作流名称</label>
                <input
                  type="text"
                  value={newWorkflowName}
                  onChange={(e) => setNewWorkflowName(e.target.value)}
                  placeholder="输入工作流名称"
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label>描述 (可选)</label>
                <textarea
                  value={newWorkflowDesc}
                  onChange={(e) => setNewWorkflowDesc(e.target.value)}
                  placeholder="输入工作流描述"
                  rows={3}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn-cancel"
                onClick={() => setShowCreateModal(false)}
              >
                取消
              </button>
              <button 
                className="btn-confirm"
                onClick={createWorkflow}
              >
                创建
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkflowList;