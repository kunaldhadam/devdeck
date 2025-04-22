import React from 'react';

const ResultCard = ({ data, type }) => {
  const isNews = type === 'news';
  return (
    <div className='bg-white' style={{ border: '1px solid black', margin: '10px 0', padding: '15px' }}>
      <h3 className='text-xl font-semibold'>{data.title}</h3>
      {isNews ? (
        <>
          <p>{data.description}</p>
          <p><b>Source:</b> {data.source}</p>
        </>
      ) : (
        <>
          <p>{data.text}</p>
          <p><b>Subreddit:</b> r/{data.subreddit}</p>
          <p><b>Upvotes:</b> {data.upvotes}</p>
        </>
      )}
      <p><b>Sentiment:</b> {data.sentiment} <span className={`sentiment-tag ${data.sentiment > 0 ? 'positive' : 
        data.sentiment == 0 ? 'neutral' : 'negative'}`}></span></p>
      <div className='mt-2 flex justify-between align-items-center'>
      <a className='text-black bg-blue-300 border border-black pt-1 px-3 rounded-2xl' href={data.url} target="_blank" rel="noreferrer">Read more</a></div>
    </div>
  );
};

export default ResultCard;
