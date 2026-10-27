import httpx
from flask import Flask, request, jsonify, render_template
from openai import OpenAI

app = Flask(__name__)

# 重点：传入 http_client=httpx.Client(proxy=None) 强制不走系统有问题的代理/编码配置
client = OpenAI(
    api_key="api_key="sk-你的_DeepSeek_API_Key写在这里", ", # 记得替换
    base_url="https://api.deepseek.com",
    http_client=httpx.Client(proxy=None) 
)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')
    
    try:
        response = client.chat.completions.create(
            model="deepseek-chat",
            messages=[
                {"role": "system", "content": "你是一个乐于助人的AI助手。"},
                {"role": "user", "content": user_message}
            ]
        )
        reply = response.choices[0].message.content
        return jsonify({'reply': reply})
    except Exception as e:
        return jsonify({'reply': f"服务器出错啦: {str(e)}"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)