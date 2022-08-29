import { useEffect, useState } from "react";
import classes from './Profile.module.css'
const Profile = () => {
    const [newDisplayName, setNewDisplayName] = useState("eastzoo");

    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewDisplayName(value);
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        console.log(newDisplayName);
    };
    return (
        <div className={classes.container}>
            <form onSubmit={onSubmit} className={classes.profileForm}>
                <input
                    onChange={onChange}
                    type="text"
                    placeholder="Display name"
                    value={newDisplayName}
                    className={classes.formInput}
                />
                <input
                    type="submit"
                    value="프로필 수정"
                    className={classes.formBtn}
                />
            </form>
            <span className={classes.cancelBtn}>
                로그아웃
            </span>
        </div>
    )
}

export default Profile