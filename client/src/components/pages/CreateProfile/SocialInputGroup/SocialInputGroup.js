import React from "react";
import PropTypes from "prop-types";

// components
import FormItemSocial from "../../../Form/FormItem/FormItemSocial";

const SocialInputGroup = props => {
  const {
    youtube,
    twitter,
    facebook,
    linkedin,
    instagram,
    toggling,
    onChange,
    errors
  } = props;

  let socialDefault = "social-links mt-3 ";
  socialDefault = !toggling ? socialDefault + "d-none" : socialDefault;

  return (
    <div className={socialDefault}>
      <small className="text-info">
        If you have one or more network profiles, you can add them to your
        profile
      </small>

      <FormItemSocial
        name="facebook"
        value={facebook}
        onChange={onChange}
        placeholder="Facebook Profile URL"
        errors={errors}
        icon={["fab", "facebook"]}
      />

      <FormItemSocial
        name="instagram"
        value={instagram}
        onChange={onChange}
        placeholder="Instagram Profile URL"
        errors={errors}
        icon={["fab", "instagram"]}
      />

      <FormItemSocial
        name="youtube"
        value={youtube}
        onChange={onChange}
        placeholder="Youtube Profile URL"
        errors={errors}
        icon={["fab", "youtube"]}
      />

      <FormItemSocial
        name="twitter"
        value={twitter}
        onChange={onChange}
        placeholder="Twitter Profile URL"
        errors={errors}
        icon={["fab", "twitter"]}
      />

      <FormItemSocial
        name="linkedin"
        value={linkedin}
        onChange={onChange}
        placeholder="Linkedin Profile URL"
        errors={errors}
        icon={["fab", "linkedin"]}
      />
    </div>
  );
};

SocialInputGroup.propTypes = {
  youtube: PropTypes.string.isRequired,
  twitter: PropTypes.string.isRequired,
  facebook: PropTypes.string.isRequired,
  linkedin: PropTypes.string.isRequired,
  instagram: PropTypes.string.isRequired,
  toggling: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

export default SocialInputGroup;
