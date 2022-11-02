import React from 'react'
import  './Grid.css'

const items = [
  {
    id: "1",
    title: "Card Grid Layout",
    subtitle: "Demo of pixel perfect pure CSS simple responsive card grid layout",
    broadcaster: "Haerin Song",
    thumbnail: "https://gigaland.io/images/items/static-1.jpg",
    userProfile: "https://gigaland.io/images/author/author-1.jpg"
  },
  {
    id: "2",
    title: "Card Grid Layout",
    subtitle: "Demo of pixel perfect pure CSS simple responsive card grid layout",
    broadcaster: "Haerin Song",
    thumbnail: "https://gigaland.io/images/items/static-2.jpg",
    userProfile: "https://gigaland.io/images/author/author-2.jpg"
  },
  {
    id: "3",
    title: "Card Grid Layout",
    subtitle: "Demo of pixel perfect pure CSS simple responsive card grid layout",
    broadcaster: "Haerin Song",
    thumbnail: "https://gigaland.io/images/items/static-3.jpg",
    userProfile: "https://gigaland.io/images/author/author-3.jpg"
  },
  {
    id: "4",
    title: "Card Grid Layout",
    subtitle: "Demo of pixel perfect pure CSS simple responsive card grid layout",
    broadcaster: "Haerin Song",
    thumbnail: "https://gigaland.io/images/items/static-4.jpg",
    userProfile: "https://gigaland.io/images/author/author-4.jpg"
  },
  {
    id: "5",
    title: "Card Grid Layout",
    subtitle: "Demo of pixel perfect pure CSS simple responsive card grid layout",
    broadcaster: "Haerin Song",
    thumbnail: "https://gigaland.io/images/items/anim-4.webp",
    userProfile: "https://gigaland.io/images/author/author-5.jpg"
  },
  {
    id: "6",
    title: "Card Grid Layout",
    subtitle: "Demo of pixel perfect pure CSS simple responsive card grid layout",
    broadcaster: "Haerin Song",
    thumbnail: "https://gigaland.io/images/items/anim-2.webp",
    userProfile: "https://gigaland.io/images/author/author-6.jpg"
  },
  {
    id: "7",
    title: "Card Grid Layout",
    subtitle: "Demo of pixel perfect pure CSS simple responsive card grid layout",
    broadcaster: "Haerin Song",
    thumbnail: "https://gigaland.io/images/items/anim-1.webp",
    userProfile: "https://gigaland.io/images/author/author-7.jpg"
  },
  {
    id: "8",
    title: "Card Grid Layout",
    subtitle: "Demo of pixel perfect pure CSS simple responsive card grid layout",
    broadcaster: "Haerin Song",
    thumbnail: "https://gigaland.io/images/items/anim-3.webp",
    userProfile: "https://gigaland.io/images/author/author-1.jpg"
  },
  {
    id: "9",
    title: "Card Grid Layout",
    subtitle: "Demo of pixel perfect pure CSS simple responsive card grid layout",
    broadcaster: "Haerin Song",
    thumbnail: "https://gigaland.io/images/items/anim-5.webp",
    userProfile: "https://gigaland.io/images/author/author-1.jpg"
  },
  {
    id: "10",
    title: "Card Grid Layout",
    subtitle: "Demo of pixel perfect pure CSS simple responsive card grid layout",
    broadcaster: "Haerin Song",
    thumbnail: "https://gigaland.io/images/items/anim-6.webp",
    userProfile: "https://gigaland.io/images/author/author-1.jpg"
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
                  <div className="card_bedge">
                    <img  src={item.userProfile} alt=""/>
                  </div>
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