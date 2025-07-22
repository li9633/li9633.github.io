export const validateToken = async (token) => {
  try {
    // 实际项目中应调用 API 验证 token 有效性
    // 此处简化实现，实际需要替换为真实验证逻辑
    const response = await fetch('/api/validate-token', {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.ok
  } catch {
    return false
  }
}
