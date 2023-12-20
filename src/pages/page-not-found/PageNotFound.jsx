import { Button, Result } from "antd";

/**
 * A React component that displays a 404 error page when a user navigates to a page that does not exist.
 * @returns A React component that displays a 404 error page with a button to return to the home page.
 */
const PageNotFound = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <Button
        type="primary"
        ghost
        onClick={() => {
          window.location.href = "/";
        }}
        className="home"
      >
        Go to Home
      </Button>
    }
  />
);
export default PageNotFound;
