<template>
  <el-card class="detail-card" shadow="hover">
    <div class="card-content">
      <!-- 标题区域 -->
      <div v-if="hasSlot('title')" class="title-section">
        <el-text class="title" tag="b" size="large">
          <slot name="title"></slot>
        </el-text>
      </div>

      <!-- 内容区域 -->
      <div v-if="hasSlot('content')" class="content-section">
        <el-text class="content">
          <slot name="content"></slot>
        </el-text>
      </div>

      <!-- 操作区域 -->
      <div v-if="hasSlot('action')" class="action-section">
        <slot name="action"></slot>
      </div>

      <!-- 页脚区域 -->
      <div v-if="hasSlot('footer')" class="footer-section">
        <slot name="footer"></slot>
      </div>

      <!-- 其他信息区域 -->
      <div v-if="hasOtherSlots" class="meta-section">
        <div v-if="hasSlot('copyright')" class="meta-item">
          <el-text class="copyright-symbol" size="small">©</el-text>
          <el-text size="small"
            ><slot name="copyright"></slot
          ></el-text>
        </div>
        <div v-if="hasSlot('author')" class="meta-item">
          <el-icon><User /></el-icon>
          <el-text size="small"><slot name="author"></slot></el-text>
        </div>
        <div v-if="hasSlot('license')" class="meta-item">
          <el-icon><Document /></el-icon>
          <el-text size="small"><slot name="license"></slot></el-text>
        </div>
        <div v-if="hasSlot('version')" class="meta-item">
          <el-icon><Ticket /></el-icon>
          <el-text size="small"><slot name="version"></slot></el-text>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { computed, useSlots } from 'vue'
import { User, Document, Ticket } from '@element-plus/icons-vue'

const slots = useSlots()

// 检查插槽是否有内容
const hasSlot = (name) => !!slots[name]

// 检查是否有其他元数据插槽
const hasOtherSlots = computed(
  () =>
    hasSlot('copyright') ||
    hasSlot('author') ||
    hasSlot('license') ||
    hasSlot('version')
)
</script>

<style lang="scss" scoped>
.detail-card {
  border-radius: 12px;
  transition: transform 0.3s ease;
  margin-bottom: 1.5rem;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }

  .card-content {
    padding: 1.5rem;

    .title-section {
      margin-bottom: 1.2rem;
      .title {
        color: var(--el-color-primary);
        border-left: 4px solid var(--el-color-primary);
        padding-left: 0.8rem;
      }
    }

    .content-section {
      margin-bottom: 1.5rem;
      .content {
        color: var(--el-text-color-regular);
        line-height: 1.7;
        font-size: 1rem;
        white-space: pre-line;
      }
    }

    .action-section {
      margin-bottom: 1.5rem;
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      transition: all 0.3s ease;

      :deep(.el-button) {
        transition: transform 0.2s ease;

        &:hover {
          transform: scale(1.05);
        }
      }
    }

    .footer-section {
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid var(--el-border-color-light);
      color: var(--el-text-color-secondary);
      font-size: 0.9rem;
    }

    .meta-section {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 12px;
      margin-top: 1.5rem;
      padding-top: 1.2rem;
      border-top: 1px solid var(--el-border-color-lighter);

      .meta-item {
        display: flex;
        align-items: center;
        gap: 8px;
        color: var(--el-text-color-secondary);
        font-size: 0.85rem;

        .el-icon {
          color: var(--el-color-info);
        }
      }
    }
  }

  @media (max-width: 768px) {
    .card-content {
      padding: 1rem;

      .meta-section {
        grid-template-columns: 1fr;
      }
    }
  }
}
</style>
