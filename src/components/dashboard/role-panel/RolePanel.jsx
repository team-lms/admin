import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import PropTypes from 'prop-types';

const RolePanel = ({
  icon,
  title,
  description,
  peoples,
  remainingPeoplesCount
}) => ((
  <div className="card bg-light mt-3">
    <div className="card-body">
      <div className="row">
        <div className="col-auto">
          <img className="rounded dashboard-listing-icon" src={ icon } alt="Supervisors" />
        </div>
        <div className="col">
          <div className="row">
            <div className="col-6">
              <h5 className="font-weight-bold">{ title }</h5>
              <p className="mb-0">{ description }</p>
            </div>
            <div className="col-6 align-self-center">
              <div className="form-row align-items-center">
                <div className="col-auto">
                  <ul className="avatars">
                    { peoples.map((people, index) => (
                      <li>
                        <OverlayTrigger overlay={ (
                          <Tooltip id={ `tooltip-for-${title}-${index + 1}` }>
                            { people.name }
                          </Tooltip>
                        ) }
                        >
                          <img className="rounded-circle" src={ people.profilePicture } alt={ people.name } />
                        </OverlayTrigger>
                      </li>
                    )) }
                  </ul>
                </div>
                <div className="col">
                  <p className="mb-0 lead">
                    +
                    { remainingPeoplesCount }
                    { ' ' }
                    peoples are working
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
));

RolePanel.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  peoples: PropTypes.arrayOf(PropTypes.shape({
    profilePicture: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired,
  remainingPeoplesCount: PropTypes.number.isRequired
};

export default RolePanel;
