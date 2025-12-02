// src/components/MessageBubble.jsx
const MessageBubble = ({ role, content, source }) => {
  const isAssistant = role === 'assistant';
  const sourceLabel = source === 'fallback' ? 'Жедел ақпарат' : 'AI көмекші';
  const isInfo = source === 'fallback';

  return (
    <div className={`flex ${isAssistant ? 'justify-start' : 'justify-end'} mb-4 px-2`}>
      <div
        className={`relative max-w-[90%] md:max-w-[80%] rounded-2xl p-4 transition-all duration-200 ${
          isAssistant
            ? 'bg-white/10 backdrop-blur-sm rounded-tl-none border border-white/5 hover:border-white/10'
            : 'bg-gradient-to-r from-blue-600/90 to-cyan-500/90 rounded-tr-none shadow-lg shadow-blue-500/20'
        } ${isInfo ? 'ring-1 ring-yellow-500/30' : ''}`}
      >
        <div 
          className={`whitespace-pre-wrap break-words ${
            isAssistant ? 'text-white/90' : 'text-white'
          }`}
        >
          {content}
        </div>
        
        {isAssistant && isInfo && (
          <div className="mt-2 pt-2 border-t border-white/5 text-xs text-white/50 flex items-center justify-end gap-2">
            <span className="inline-flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h.01a1 1 0 100-2H10V9z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-yellow-300/80">{sourceLabel}</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;