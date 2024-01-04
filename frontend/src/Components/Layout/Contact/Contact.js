import "./Contact.css";
import { Button } from "@material-ui/core";

const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:deluxeshera@gmail.com">
        <Button>Contact: deluxeshera@gmail.com</Button>
      </a>
    </div>
  );
};

export default Contact;
