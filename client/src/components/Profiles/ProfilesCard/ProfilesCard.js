import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import isEmpty from "../../../assets/utils/isEmpty";

const ProfilesCard = ({ profile }) => {
  const { user, status, skills, handle } = profile;

  const renderingSkills = () => {
    if (skills.length > 0) {
      return skills.slice(0, 4).map(skill => {
        return (
          <li key={skill} className="list-group-item">
            <FontAwesomeIcon icon="check" /> {skill}
          </li>
        );
      });
    }
  };
  console.log(user);
  return (
    <div className="col-sm-12 col-md-6 mb-3">
      <div className="card bg-light">
        <header className="card-title d-flex justify-content-between align-items-center card-header bg-dark text-white">
          <img
            src={user.avatar}
            alt="avatar"
            className="rounded-circle d-md-block d-none"
            style={{ maxWidth: "40px", maxHeight: "40px" }}
          />
          <h5 className="text-capitalized">
            {user.name}{" "}
            <sup className="text-light">{!isEmpty(status) ? status : null}</sup>
          </h5>
        </header>

        <section className="card-body">
          <h4 className="h4">Skills</h4>

          <ul className="list-group  mb-3">{renderingSkills()}</ul>

          <Link
            to={`/profile/handle/${handle}`}
            className="btn btn-info btn-block"
          >
            Profile
          </Link>
        </section>
      </div>
    </div>
  );
};

export default ProfilesCard;
