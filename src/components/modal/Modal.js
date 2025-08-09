import './modal.css';
import { useState } from 'react';

export const Modal = ({ Icon, iconColor='#000', title='', openStatus=true, content='', buttons=1, fontFamily='' }) => {
  const [open, setOpen] = useState(openStatus);                   // Input alert status
  
  { open !== false && document.getElementById('body').classList.add('noScroll') }
  
  const handleClose = () => {                                     // Close the alert
    setOpen(false);
    document.getElementById('alert').remove();
    document.getElementById('body').classList.remove('noScroll');
  }
    
    return (
      <>
        {
          open !== false && <>
                    <div className={fontFamily + ' modalContainer justify-items-center justify-content-center'}>
                      <div className={'modalBox'}>
                        <div className={'modalHeader'}>
                          <center><Icon color={iconColor} height={4.5} width={4.5} className={'bounce center mt-4'} /></center>
                          <h3 className={'modalTitle main-color pt-3'}>{ title }</h3>
                        </div>
                        { content ? <div className={'modalContent'}><center><h3>{ content }</h3></center></div>
                                  : ''
                        }
                        <div className={'modalFooter justify-items-center'}>
                          <div className={'mt-4'}>
                              {   buttons === 1 ? <button className={'aceptBtn w-100'} onClick={ handleClose }>Aceptar</button>
                                : buttons === 2 ? <><button className={'aceptBtn w-100'} onClick={ handleClose }>Aceptar</button> <button className={'cancelBtn w-100'} onClick={ handleClose }>Cancel</button></>
                                : ""}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={'darkBackground'} onClick={ handleClose }></div>
                  </>
        }
      </>
    )
};
export default Modal;