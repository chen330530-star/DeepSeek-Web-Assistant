Page({
  data: {
    messages: [
      { id: 1, role: 'ai', content: '你好！我是你的 AI 助手，有什么可以帮你的吗？' }
    ],
    inputValue: '',
    isLoading: false,
    lastMsgId: 'msg-1'
  },

  onInput(e) {
    this.setData({
      inputValue: e.detail.value
    });
  },

  sendMessage() {
    const text = this.data.inputValue.trim();
    if (!text || this.data.isLoading) return;

    // 1. 将用户消息上屏
    const userMsg = { id: Date.now(), role: 'user', content: text };
    const newMessages = this.data.messages.concat(userMsg);
    
    this.setData({
      messages: newMessages,
      inputValue: '',
      isLoading: true,
      lastMsgId: `msg-${userMsg.id}` // 让滚动条到底部
    });

    // 2. 发送网络请求给 Flask 后端
    // ⚠️⚠️⚠️ 注意：请把下面的 IP 换成你电脑的局域网 IP（用 ipconfig 查）
    const requestUrl = 'http://172.20.10.2:5000/chat'; 

    wx.request({
      url: requestUrl,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      data: {
        message: text
      },
      success: (res) => {
        if (res.statusCode === 200 && res.data.reply) {
          const aiMsg = { id: Date.now(), role: 'ai', content: res.data.reply };
          this.setData({
            messages: this.data.messages.concat(aiMsg),
            lastMsgId: `msg-${aiMsg.id}`
          });
        } else {
          this.showError('AI 返回数据异常');
        }
      },
      fail: (err) => {
        console.error('请求失败:', err);
        this.showError('网络请求失败，请检查后端是否开启');
      },
      complete: () => {
        this.setData({ isLoading: false });
      }
    });
  },

  showError(msg) {
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 2000
    });
  }
});