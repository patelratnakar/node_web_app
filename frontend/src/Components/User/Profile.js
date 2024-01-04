import { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../Layout/Metadata";
import Loader from "../Loading/Loading";
import { Link } from "react-router-dom";
import "./Profile.css";
const Profileimg = 'https://ik.imagekit.io/shera/Images/tr:w-200,f-auto/Profile.png'

const Profile = ({ history }) => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  // console.log(user)
  useEffect(() => {
    if (isAuthenticated === false) {
      history.push("/login");
    }
  }, [history, isAuthenticated]);

  let src
  if (user && user.Avatar && user.Avatar.url) {
    src = user.Avatar.url
    src = src.substring(0, 55) + "f_auto/" + src.substring(55, src.length);
  }
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user.Name}'s Profile`} />
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img src={ src ? src : Profileimg} alt={user.Name} />
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.Name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.Email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user.CreatedAt).substr(0, 10)}</p>
              </div>

              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
