import React, { useState } from "react";
import classes from './Home.module.css';

const Home = () => {
    const [newPost, setNewPost] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();

        console.log(newPost);
        setNewPost("");
    };

    //input 입력 targeting
    const onChange = (event) => {
        const { target: { value },
        } = event;
        setNewPost(value);
    };

    return (
        <div>
            <form onSubmit={onSubmit} className={classes.factoryForm}>
                <div className={classes.factoryInput__container}>
                    <input
                        className={classes.factoryInput__input}
                        value={newPost}
                        onChange={onChange}
                        type="text"
                        placeholder="Picker들과 공유할 Youtube URL을 넣어주세요!"
                        maxLength={120}
                    />
                    <input type="submit" value="&rarr;" className={classes.factoryInput__arrow} />
                </div>
            </form>
        </div>
    )
}

export default Home