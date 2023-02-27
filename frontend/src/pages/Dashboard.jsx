import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../features/auth/authSlice";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    navigate("/");
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch]);

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
      </section>
    </>
  );
}

export default Dashboard;
