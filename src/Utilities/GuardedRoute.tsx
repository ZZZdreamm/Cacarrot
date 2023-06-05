import { Navigate, Outlet, Route } from "react-router-dom";

// interface GuardedRouteProps {
//   isRouteAccessible?: boolean;
//   redirectRoute?: string;
//   children:any;

// }
//@ts-ignore
export default function GuardedRoute({isAuthenticated }) {
  return (
    // <Route {...rest}><>
    <>
      {isAuthenticated ? <Outlet/> : <Navigate to={"/login"} />}
      </>
    // </Route>
  );
}
