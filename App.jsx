import React, { useState, useEffect } from 'react';
import './App.css'; // You can define your styles in App.css
import axios from 'axios'; // For making API requests

function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    try {
      const response = await axios.get('https://api.quotable.io/random');
      setQuote(response.data.content);
      setAuthor(response.data.author);
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  const tweetQuote = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `"${quote}" - ${author}`
    )}`;
    window.open(tweetUrl, '_blank');
  };

  return (
    <div id="quote-box" className="container">
      <div id="text">{quote}</div>
      <div id="author">- {author}</div>
      <button id="new-quote" onClick={fetchQuote}>
        New Quote
      </button>
      <a id="tweet-quote" href="#" onClick={tweetQuote}>
        Tweet Quote
      </a>
    </div>
  );
}

export default App;
