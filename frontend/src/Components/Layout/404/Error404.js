import ErrorIcon from "@material-ui/icons/Error";
import "./Error404.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="PageNotFound">
      <ErrorIcon />

      <Typography>Page Not Found </Typography>
      <Link to="/">Home</Link>
    </div>
  );
};

export default Error404;