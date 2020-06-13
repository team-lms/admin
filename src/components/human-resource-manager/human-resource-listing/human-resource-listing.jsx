import React, { useState, useEffect } from 'react';
import { UserPlus } from 'react-feather';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { toast } from 'react-toastify';
import action from '../../../assets/img/Setting-2.png';
import Header from '../../header/header';
import { HumanResource } from '../../../api/service';


const HumanResourceList = () => {
  const [humanResources, setHumanResources] = useState([]);
  const [filters] = useState({
    limit: 10, offset: 0, sortType: 'ASC', sortField: 'createdAt'
  });

  const getHumanResourceList = async () => {
    const result = await HumanResource.getHumanResourceList(filters);
    if (result.data.success) {
      setHumanResources(...humanResources, result.data.data.rows);
    } else {
      toast.error(result.message);
    }
  };
  useEffect(() => {
    getHumanResourceList();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
        <Header selectedPage="Human Resource Managers" />
        <div className="btn-toolbar mb-2 mb-md-0">
          <Link to="/humanresource/create">
            <button type="button" className="btn btn-sm btn-primary mr-2">
              <span>Add </span>
              <UserPlus size={ 13 } />
            </button>
          </Link>
          <button type="button" className="btn btn-sm btn-outline-secondary">Filters</button>
        </div>
      </div>

      <div className="table-responsive mb-3">
        <table className="table table-hover mb-0">
          <thead>
            <tr>
              <th className="border-top-0 border-bottom-0">Basic Details</th>
              <th className="border-top-0 border-bottom-0">Contact Details</th>
              <th className="border-top-0 border-bottom-0">Supervisor</th>
              <th className="border-top-0 border-bottom-0">Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              humanResources.map((humanResource, index) => (
                <tr key={ humanResource.id }>
                  <td className={ index === 0 ? 'border-top-0' : '' }>
                    <span className="d-block">
                      {humanResource.firstName}
                      {' '}
                      {humanResource.lastName}
                    </span>
                    <small className="text-muted">
                      (Since
                      { ' ' }
                      { moment(humanResource.createdAt).format('Do MMM YYYY') }
                      )
                    </small>
                  </td>
                  <td className={ index === 0 ? 'border-top-0' : '' }>
                    <span className="d-inline-block">
                      <span className="d-block">
                        {humanResource.email}
                      </span>
                      <small className="text-muted">{humanResource.phoneNumber}</small>
                    </span>
                  </td>
                  <td className={ index === 0 ? 'border-top-0' : '' }>
                    <span className="d-block">
                      Sally Pena
                    </span>
                    <small className="text-muted">(Technical Head)</small>
                  </td>
                  <td className={ index === 0 ? 'border-top-0' : '' }>
                    <OverlayTrigger
                      trigger="click"
                      placement="bottom"
                      rootClose="false"
                      overlay={
                        (
                          <Popover id={ `popover-positioned-${humanResource.id}` }>
                            <Popover.Content bsPrefix="popover-body p-0 overflow-hidden rounded">
                              <div className="list-group list-group-flush rounded">
                                <Link className="list-group-item list-group-item-action py-1 px-2" to="/employee">Edit</Link>
                                <Link className="list-group-item list-group-item-action py-1 px-2" to="/">Delete</Link>
                              </div>
                            </Popover.Content>
                          </Popover>
                        )
                      }
                    >
                      <button type="button" className="btn  btn-sm py-0">
                        <img className="path" src={ action } alt="action icon" />
                      </button>
                    </OverlayTrigger>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  );
};

export default HumanResourceList;
