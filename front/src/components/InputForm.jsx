import React from 'react'

export default function InputForm() {
  const handleKeyword = () => {
  }
  return (
    <div className="search">
      <form>
        <input
          placeholder="Search for YouTube keywords"
          onChange={handleKeyword}
        />
      </form>
    </div>
  );
}
