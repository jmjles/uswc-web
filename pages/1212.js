import Page from "../layout/Page";
import { Typography as Font } from "@material-ui/core";
const Promo = () => {
  return (
    <Page title="1212" className="MCS">
      <img src="/img/1212.png" />
      <section>
        <Font variant="h2" component="h1">
          What is Mic Check Sesh?
        </Font>
        <Font variant="body1">
          Mic Check Sesh is one of the new show lineup on U.S. Weed Channel you
          do not want to miss! <br />
          Every episode of MCS brings together the talents of 4 amazing artists
          on one show!
        </Font>
        <Font variant="h3" component="h2">
          Get Involved
        </Font>
        <Font variant="body1">
          Get your brand associated with multiple up-and-coming Artists when you
          advertise on Mic Check Sesh.
        </Font>
      </section>
      <section></section>
    </Page>
  );
};

export default Promo;
