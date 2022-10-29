import React from 'react'
import  './Grid.css'

const items = [
  {
    id: "1",
    title: "Card Grid Layout",
    subtitle: "Demo of pixel perfect pure CSS simple responsive card grid layout",
    broadcaster: "Haerin Song",
    thumbnail: "https://picsum.photos/500/300/?image=10",
  },
  {
    id: "2",
    title: "Card Grid Layout",
    subtitle: "Demo of pixel perfect pure CSS simple responsive card grid layout",
    broadcaster: "Haerin Song",
    thumbnail: "https://picsum.photos/500/300/?image=5",
  },
  {
    id: "3",
    title: "Card Grid Layout",
    subtitle: "Demo of pixel perfect pure CSS simple responsive card grid layout",
    broadcaster: "Haerin Song",
    thumbnail: "https://picsum.photos/500/300/?image=11",
  },
  {
    id: "4",
    title: "Card Grid Layout",
    subtitle: "Demo of pixel perfect pure CSS simple responsive card grid layout",
    broadcaster: "Haerin Song",
    thumbnail: "https://picsum.photos/500/300/?image=14",
  },
  {
    id: "5",
    title: "Card Grid Layout",
    subtitle: "Demo of pixel perfect pure CSS simple responsive card grid layout",
    broadcaster: "Haerin Song",
    thumbnail: "https://picsum.photos/500/300/?image=17",
  },
  {
    id: "6",
    title: "Card Grid Layout",
    subtitle: "Demo of pixel perfect pure CSS simple responsive card grid layout",
    broadcaster: "Haerin Song",
    thumbnail: "https://picsum.photos/500/300/?image=2",
  },
  {
    id: "7",
    title: "Card Grid Layout",
    subtitle: "Demo of pixel perfect pure CSS simple responsive card grid layout",
    broadcaster: "Haerin Song",
    thumbnail: "https://picsum.photos/500/300/?image=21",
  },
  {
    id: "8",
    title: "Card Grid Layout",
    subtitle: "Demo of pixel perfect pure CSS simple responsive card grid layout",
    broadcaster: "Haerin Song",
    thumbnail: "https://picsum.photos/500/300/?image=22",
  },
  {
    id: "9",
    title: "Card Grid Layout",
    subtitle: "Demo of pixel perfect pure CSS simple responsive card grid layout",
    broadcaster: "Haerin Song",
    thumbnail: "https://picsum.photos/500/300/?image=26",
  },
  {
    id: "10",
    title: "Card Grid Layout",
    subtitle: "Demo of pixel perfect pure CSS simple responsive card grid layout",
    broadcaster: "Haerin Song",
    thumbnail: "https://picsum.photos/500/300/?image=27",
  },
]

const Grid = () => {
  return (
    <>
      <div className="main">
        <ul className="cards">
          {items.map((item) => (
            <li className="cards_item" key={item.id}>
              <div className="card">
                <div className='card_images'>
                  <div className="card_bedge"></div>
                  <div class="card_image">
                    <img src={item.thumbnail} alt="" />
                  </div>
                </div>
                <div className="card_content">
                  <h2 className="card_title">{item.title}</h2>
                  <p className="card_text">{item.subtitle}</p>
                  <button className="btn card_btn">Read More</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Grid