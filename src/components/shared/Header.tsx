import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMeQuery } from "../../generated/graphql";
import appLogo from '../../images/logo.svg';
import GlowingButton from "./GlowingButton";

const Header: React.FC = () => {
    const { data } = useMeQuery()
    const navigate = useNavigate();
  return (
    <React.Fragment>
      {!data?.me.verified && (
        <div className="bg-red-500 p-3 text-center text-base text-white">
                  <span>Please verify your email.</span>
                  <GlowingButton onClick={() => navigate('/verify-email')} className="ml-10" label="Click Here"/>
        </div>
      )}
      <header className="py-4">
        <div className="w-full px-5 xl:px-0 max-w-screen-2xl mx-auto flex justify-between items-center">
          <Link to="/">
            <img src={appLogo} className="w-44" alt="FoodiZone" />
          </Link>
          <span className="text-xs">
            <Link to="/edit-profile">
              <FontAwesomeIcon icon={faUser} className="text-3xl" />
            </Link>
          </span>
        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;