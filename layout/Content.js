import Head from "next/head";
import Proptypes from "prop-types";

const Content = (props) => {
  return (
    <div className={props.className ? props.className : ""}>
      <Head>
        <title>{props.title ? `USWC | ${props.title}` : ""}</title>
      </Head>
      {props.children}
    </div>
  );
};
Content.propTypes = {
  className: Proptypes.string,
  title: Proptypes.string.isRequired,
};
export default Content;
