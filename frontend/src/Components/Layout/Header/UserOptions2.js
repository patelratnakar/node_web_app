import { Fragment, useState } from "react";
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import Backdrop from "@material-ui/core/Backdrop";
import InputIcon from "@material-ui/icons/Input";
import { useHistory } from "react-router-dom";
const Profile = 'https://ik.imagekit.io/shera/Images/tr:w-200,f-auto/Profile.png';

const UserOptions2  = () => {
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const options = [
    { icon: <InputIcon />, name: "Login", func: loginUser },
  ];
  

  function loginUser() {
      history.push('/login')
  }
    
  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={Profile}
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions2 ;
