import { useState, useCallback } from 'react';

export function useVoiceInput(onSpeechResult) {
  const [isListening, setIsListening] = useState(false);
  const [hasSupport] = useState(() => 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window);

  const toggleListening = useCallback(() => {
    if (!hasSupport) {
      alert('Speech recognition is not supported in this browser. Voice-ready architecture enabled.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (onSpeechResult) onSpeechResult(transcript);
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognition.start();
    }
  }, [hasSupport, isListening, onSpeechResult]);

  return { isListening, hasSupport, toggleListening };
}
