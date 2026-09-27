# 最后一班 — AI NPC 2D RPG

一个发生在 2040 年榕海的浏览器 2D RPG 原型。玩家扮演台湾青年周予安，在和盛智造园区移动、调查设备、推进任务，并与拥有固定履历、有限知识和关系记忆的 AI NPC 对话。

## 运行

Codespaces 会自动运行开发服务器。在底部 **Ports** 面板打开端口 3000。

本地运行需要 Node.js 22.9 或更高版本：

```sh
cp .env.example .env
# 在 .env 中填写 DEEPSEEK_API_KEY
npm run dev
```

键盘使用 WASD 或方向键移动，靠近人物或设备后按 E / 空格互动；移动端提供屏幕方向键。

## AI 对话

服务端使用 DeepSeek V4.1 Flash（`deepseek-flash`）。API Key 只由服务端读取，不会发送到浏览器或写入 GitHub。没有 Key 时游戏仍可使用本地剧情回应。

NPC 提示词固定世界事实、人物履历和知识边界。每次请求仅包含当前人物、任务阶段、玩家本句话和最多四条双方记忆。运行 `npm run check` 可检查语法和接口测试。
