import React from 'react';

const SearchBar = ({ keyword, setKeyword, onSearch }) => (
  <div style={{ marginBottom: '20px' }}>
    <input className='searchbar'
      type="text"
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
      placeholder="Search topic..."
      style={{ padding: '8px', width: '300px', marginRight: '10px' }}
    />
    <button className='' onClick={onSearch} style={{ padding: '8px 16px' }}>
      Search
    </button>
  </div>
);

export default SearchBar;
