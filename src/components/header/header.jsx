import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Search } from 'react-feather';

const Header = ({
  selectedPage, handleSearch
}) => {
  const [searchInput, setSearchInput] = useState(null);

  useEffect(() => {
    handleSearch(searchInput);
  }, [searchInput]);

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchInput(() => value);
  };

  return (
    <>
      <div className="d-flex flex-row bd-highlight mb-3 w-80">
        <div className="p-2 bd-highlight">
          <div className="column">
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="btn-sm">
                { selectedPage }
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Link className="dropdown-item" to="/employee/list">Employees</Link>
                <Link className="dropdown-item" to="/supervisor/list">Supervisors</Link>
                <Link className="dropdown-item" to="/humanresource/list">Human Resource Managers</Link>
                <Link className="dropdown-item" to="/team/list">Teams</Link>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className="p-2 bd-highlight w-50">
          <form>
            <div className="col-auto">
              <div className="input-group mb-2">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <Search size={ 20 } />
                  </div>
                </div>
                <input
                  className="form-control"
                  type="text"
                  id="searchInput"
                  name="search"
                  aria-describedby="searchHelp"
                  value={ searchInput }
                  onChange={ handleChange }
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
Header.propTypes = {
  selectedPage: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired
};
export default Header;
