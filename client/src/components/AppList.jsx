import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import '../styles/appList.css';
import AppCard from './AppCard';
import { Droppable } from 'react-beautiful-dnd';
import NewAppModal from './modals/NewAppModal';
import { Col } from 'react-bootstrap';

const content = {
  wishlist: 'For later',
  applied: 'Applied',
  phone: 'Phone Interview',
  'on site': 'On Site Interview',
  offer: 'Offer Recieved',
  rejected: 'Rejected',
};

const AppList = ({ name, icon, listIntFromDB }) => {
  const [showModal, setShowModal] = useState(false);

  const userApps = useSelector((state) => state.userApps);
  const { apps } = userApps;

  const handleClose = () => {
    setShowModal(false);
  };

  const showAppModal = () => {
    setShowModal(true);
  };

  return (
    <>
      <Col className='list-container' xs={6} sm={4} md={4} lg={4} xl={2}>
        <div className='list-header'>
          <div className='list-header-main'>
            <div className='list-header-main-title'>
              <span>
                <i className={icon}></i>
              </span>
              {content[name]}
            </div>
            <div className='list-header-main-count'>
              {apps[name] && apps[name].length ? apps[name].length : 0} job
              {`${apps[name].length === 1 ? '' : 's'}`}
            </div>
          </div>
        </div>
        <div className='list-add' onClick={showAppModal}>
          <i className='fas fa-plus' />
        </div>
        <Droppable droppableId={name}>
          {(provided) => (
            <div
              className='list-body-main'
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {apps[name] &&
                apps[name].map((app, index) => (
                  <AppCard app={app} key={app.id} index={index} />
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Col>
      <NewAppModal
        show={showModal}
        handleClose={handleClose}
        listValue={listIntFromDB}
      />
    </>
  );
};

export default AppList;
