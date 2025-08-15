document.addEventListener('DOMContentLoaded', function () {
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendButton');
    const messageArea = document.getElementById('messageArea');
   const hfModelURL = "https://api-inference.huggingface.co/models/panda7484/llama2-legal-lora";
    const hfToken = "######";

    sendButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    async function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;

        addMessage(message, 'user');
        chatInput.value = '';
        addMessage("Thinking...", 'ai');

        try {
            const res = await fetch(hfModelURL, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${hfToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    inputs: message
                })
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            const aiReply = data?.[0]?.generated_text || "⚠️ No response";

            const lastAI = [...document.querySelectorAll('.ai-message')].pop();
            if (lastAI) lastAI.textContent = aiReply;

        } catch (error) {
            const lastAI = [...document.querySelectorAll('.ai-message')].pop();
            if (lastAI) lastAI.textContent = "❌ Error: " + error.message;
        }
    }

    function addMessage(text, sender) {
        const div = document.createElement('div');
        div.classList.add(sender + '-message');
        div.textContent = text;
        messageArea.appendChild(div);
        messageArea.scrollTop = messageArea.scrollHeight;
    }
});
