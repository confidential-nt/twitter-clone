import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Auth from "../../service/auth";
import { firebaseAuth } from "../../service/firebase";

type Props = { auth: Auth; onToggleModal: (modalState: boolean) => void };

const Home = ({ auth, onToggleModal }: Props) => {
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
          onToggleModal(false);
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
