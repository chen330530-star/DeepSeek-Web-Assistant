# 🤖 DeepSeek Web Assistant

基于 Flask 框架与 DeepSeek API 构建的全栈 AI 问答助手演示项目。

## 📝 项目简介
本项目是一个轻量级的前后端分离 AI 对话应用。前端采用原生 HTML/CSS/JS 构建交互界面，后端使用 Python Flask 框架提供 API 服务，并成功接入 DeepSeek 大语言模型，实现实时对话。

## 🛠 技术栈
*   **前端**：HTML5, CSS3, JavaScript (Fetch API)
*   **后端**：Python 3.11, Flask
*   **AI 模型**：DeepSeek API (OpenAI SDK)
*   **网络库**：httpx

## 🏗 系统架构
1. 用户在网页端输入问题，点击发送。
2. 前端 JS 发起 `POST` 请求至 `/chat` 路由，携带 JSON 数据。
3. Flask 后端接收请求，调用 DeepSeek API 生成回复。
4. 后端通过 `try-except` 处理网络和编码异常，将结果以 JSON 格式返回。
5. 前端解析 JSON 并将对话渲染在页面上。

## 🚀 本地运行指南
1. 克隆项目到本地。
2. 安装依赖：`pip install flask openai httpx`
3. 在 `app.py` 中填入你的 DeepSeek API Key。
4. 运行程序：`python app.py`
5. 浏览器访问：`http://127.0.0.1:5000`

## 📸 运行效果截图
<img width="1146" height="356" alt="efd653d8f508930fbe99f531adca93a4" src="https://github.com/user-attachments/assets/525e0b31-5fe4-4c94-98c8-14a4cb1d6d42" />
