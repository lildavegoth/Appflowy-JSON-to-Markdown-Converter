// Common utilities for all pages
class AppFlowyConverter {
    constructor() {
        this.init();
    }

    init() {
        // Add any global initialization here
        console.log('AppFlowy Converter initialized');
    }

    parseDelta(deltaText) {
        try {
            const delta = JSON.parse(deltaText);
            let result = '';
            
            for (const item of delta) {
                if (item.insert) {
                    let text = item.insert;
                    const attrs = item.attributes || {};
                    
                    if (attrs.bold) text = `**${text}**`;
                    if (attrs.italic) text = `*${text}*`;
                    if (attrs.underline) text = `<u>${text}</u>`;
                    if (attrs.strikethrough) text = `~~${text}~~`;
                    if (attrs.code) text = `\`${text}\``;
                    
                    result += text;
                }
            }
            return result;
        } catch (e) {
            console.error('Delta parse error:', e);
            return deltaText;
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="close-btn">&times;</button>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            display: flex;
            justify-content: space-between;
            align-items: center;
            min-width: 300px;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Close button
        notification.querySelector('.close-btn').onclick = () => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        };
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // Add CSS for notifications
    addNotificationStyles() {
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
                .close-btn {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 20px;
                    cursor: pointer;
                    margin-left: 10px;
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.converter = new AppFlowyConverter();
    window.converter.addNotificationStyles();
});