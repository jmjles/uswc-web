import Wip from "../components/Wip";
import Page from "../layout/Page";
import { Typography as Font } from "@material-ui/core";
const Fishin = () => {
  return (
    <Page title="Fishin" className="Fishin">
      <img src="/" />

      <section>
        <Font variant="subtitle1">
          a unique new way to talk about the plight of American Veterans.
        </Font>
        <Font variant="body1">
          Forget group meetings, sitting in the doctor office, your nagging
          mother-in-law and your lame ass boss! We are going to talk about whats
          really going on with U.S. Veterans, opioids, CBD and Cannabis use
          ...and whatever the hell else we want to! When we want to relax and
          let it all out WE'RE GOING FISHIN'!
          <br />
          Join Host U.S. Veteran Chris Chambers, a celebrity guest and, one
          standard-issue U.S. Veteran for some fishing, fun, a lil
          drinkin-and-smokin and some no-bullshit talk about the plight of U.S.
          Veterans and their families. We might even catch a fish!
        </Font>
        <Font variant="h2">Will Save Veteran Lives</Font>
        <Font variant="body1">
          The goal s to have these episodes ready to view for the holiday season
          2020. With Immediate participation from you, your group or business we
          can make sure our veterans have MGF to turn too in tough times.
          Mission: Gone Fishin' is meant to make 23-viewers-a-day stick around
          for another episode.
        </Font>
      </section>
      <img src="/img/vet-meds.png" />
    </Page>
  );
};

export default Fishin;
