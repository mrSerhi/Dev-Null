import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import isEmpty from "../../assets/utils/isEmpty";

const ProfileHeader = ({ profile }) => {
  const { user, status, company, location } = profile;

  const renderingSocial = () => {
    let social = profile.social ? profile.social : [];

    if (profile.website || !isEmpty(profile.website)) {
      social.website = profile.website;
    }

    if (Object.keys(social).length > 0) {
      return Object.keys(social).map(key => {
        const icon = key === "website" ? "globe" : ["fab", key];
        return (
          <a
            key={key + Date.now}
            href={social[key]}
            className="btn btn-link text-light"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={icon} size="2x" />
          </a>
        );
      });
    } else {
      return null;
    }
  };

  return (
    <div className="row">
      <article className="card card-body d-flex flex-column justify-content-around align-items-center bg-primary text-white">
        <div className="profile-user__avatar">
          <img src={user.avatar} alt="avatar" className="rounded-circle" />
        </div>

        <div className="profile-user__data text-center mt-3">
          <h4 className="display-5 text-uppercase">{user.name}</h4>
          <h6 className="display-6 text-capitalize">
            {status} {company !== "" ? "in " + company : null}
          </h6>
          {location !== "" ? (
            <p className="text-capitalize">{location}</p>
          ) : null}
        </div>

        <div className="profile-user-social">
          <div className="d-flex flex-row justify-content-between">
            {renderingSocial()}
          </div>
        </div>
      </article>
    </div>
  );
};

ProfileHeader.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileHeader;
