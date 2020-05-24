import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const RolePanel = ({
  Icon,
  title,
  description,
  peoples,
  remainingPeoplesCount,
  route
}) => ((

  <div className="card bg-light mt-3">
    <div className="card-body">
      <Link to={ route } className="text-decoration-none text-body">
        <div className="row">
          <div className="col-auto text-primary">
            <Icon size={ 50 } />
          </div>
          <div className="col">
            <div className="row">
              <div className="col-6">
                <h5 className="font-weight-bold">{title}</h5>
                <p className="mb-0">{description}</p>
              </div>
              <div className="col-6 align-self-center">
                <div className="form-row align-items-center">
                  <div className="col-auto">
                    <ul className="avatars">
                      {peoples.map((people, index) => (
                        <li key={ people.name }>
                          <OverlayTrigger overlay={ (
                            <Tooltip id={ `tooltip-for-${title}-${index + 1}` }>
                              {people.name}
                            </Tooltip>
                          ) }
                          >
                            <img className="rounded-circle" src={ people.profilePicture } alt={ people.name } />
                          </OverlayTrigger>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="col">
                    <p className="mb-0 lead">
                      +
                      {remainingPeoplesCount}
                      {' '}
                      peoples are working
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  </div>
));

RolePanel.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  peoples: PropTypes.arrayOf(PropTypes.shape({
    profilePicture: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired,
  remainingPeoplesCount: PropTypes.number.isRequired,
  route: PropTypes.string.isRequired
};

export default RolePanel;
