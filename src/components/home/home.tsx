import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Auth from "../../service/auth";
import { firebaseAuth } from "../../service/firebase";

type Props = { auth: Auth };

const Home = ({ auth }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  //   const state = location.state as { userId?: string };
  //   const userId = state?.userId;
  const user = firebaseAuth.currentUser;

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  });

  return (
    <div>
      <button
        onClick={() => {
          auth.logout();
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
