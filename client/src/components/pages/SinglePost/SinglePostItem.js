import React from "react";
import { format } from "date-fns";
import PropTypes from "prop-types";

const SinglePostView = ({ post }) => {
  return (
    <div className="row">
      <div className="col-md-10 m-auto">
        <div className="card card-body bg-light my-5 animated zoomIn">
          <div className="row">
            <div className="col-md-3">
              <img
                src={post.avatar}
                alt="avatar"
                className="rounded-circle d-none d-sm-block"
              />

              <h4 className="text-center text-capitalize text-warning mt-2">
                {post.name}
              </h4>
            </div>

            <div className="col-md-8">
              <h6 className="post-date text-muted text-center">
                {format(post.date, "DD MMM YYYY HH:mm A")}
              </h6>
              <p className="lead mt-4">{post.text}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

SinglePostView.propTypes = {
  post: PropTypes.object.isRequired
};

export default SinglePostView;
