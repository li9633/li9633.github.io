<template>
  <PageContainer>
    <HeaderTitle>
      <template #primary>关于我们</template>
    </HeaderTitle>

    <el-divider />

    <div class="about-content">
      <el-text>
        这里是关于页面的内容，介绍网站或团队的背景信息。
      </el-text>
      <!-- 添加更多内容 -->
    </div>
  </PageContainer>
</template>

<script setup>
import HeaderTitle from '@/components/Header/HeaderTitle.vue'
import PageContainer from '@/components/Layout/PageContainer.vue'
</script>

<style lang="scss" scoped>
.about-content {
  padding: 1.5rem;

  .el-text {
    line-height: 1.7;
    font-size: 1rem;
  }
}
</style>
