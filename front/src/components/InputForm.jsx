import React from 'react'

const InputForm = () => {
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

export default InputForm