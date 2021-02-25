import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withBaseLayout} from '../js/layouts/Base';
import {updateSettings} from '../_actions/settings';

function Settings() {
  const dispatch = useDispatch();
  const {isDarkTheme, showNotifications, playSound} = useSelector(({settings}) => settings);

  const handleChange = ({target: {checked, name}}) => {
    dispatch(updateSettings(name, checked))
  }
  

  return (
        <div className="centered-view">
          <div className="centered-container">
            <form className="centered-container-form">
              <div className="header">Пользовательские настройки</div>
              <div className="form-container">
                <div className="my-3">
                  <div className="form-check">
                    <input
                      checked={isDarkTheme}
                      onChange ={handleChange}
                      name="isDarkTheme"
                      type="checkbox"
                      className="form-check-input" />
                    <label className="form-check-label">Темный режим</label>
                  </div>
                  <div className="form-check">
                    <input
                      checked={showNotifications}
                      onChange ={handleChange}
                      name="showNotifications"
                      type="checkbox"
                      className="form-check-input" />
                    <label className="form-check-label">Включить уведомления</label>
                  </div>
                  <div className="form-check">
                    <input
                      checked={playSound}
                      onChange ={handleChange}
                      name="playSound"
                      type="checkbox"
                      className="form-check-input" />
                    <label className="form-check-label">Звук уведомлений</label>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
    )
}


export default withBaseLayout(Settings, {canGoBack: true})