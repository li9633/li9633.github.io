// src/api/github.js
import request from '../request'

// GitHub API基础URL
const GITHUB_API_BASE = 'https://api.github.com'

// 获取仓库信息
export const getRepoInfo = async (owner, repo) => {
  try {
    const response = await request.get(`${GITHUB_API_BASE}/repos/${owner}/${repo}`)
    return response.data || response
  } catch (error) {
    console.error(`获取仓库 ${owner}/${repo} 信息失败:`, error)
    throw error
  }
}

// 获取仓库贡献者列表
export const getRepoContributors = async (owner, repo) => {
  try {
    const response = await request.get(`${GITHUB_API_BASE}/repos/${owner}/${repo}/contributors`)
    return response.data || response
  } catch (error) {
    console.error(`获取仓库 ${owner}/${repo} 贡献者信息失败:`, error)
    throw error
  }
}

// 获取仓库详细信息（包括贡献者）
export const getRepoDetails = async (owner, repo) => {
  try {
    const [repoInfo, contributors] = await Promise.all([
      getRepoInfo(owner, repo),
      getRepoContributors(owner, repo)
    ])

    return {
      ...repoInfo,
      contributors: contributors
    }
  } catch (error) {
    console.error(`获取仓库 ${owner}/${repo} 详细信息失败:`, error)
    throw error
  }
}
