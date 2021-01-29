import { Typography as Font } from "@material-ui/core";
import { Facebook, Instagram, YouTube } from "@material-ui/icons";
const Footer = () => {
  return (
    <footer>
      <div>
        <Font variant="h4">Follow Us</Font>
        <div id="socials">
          <a
            href="https://www.facebook.com/usweedchannel/"
            target="_blank"
            rel="nofollow"
          >
            <Facebook color="primary" />
          </a>

          <a
            href="https://www.instagram.com/usweedchannel/"
            target="_blank"
            rel="nofollow"
          >
            <Instagram color="primary" />
          </a>
          <a
            href="https://www.youtube.com/user/TheUSweedchannel"
            target="_blank"
            rel="nofollow"
          >
            <YouTube color="primary" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
