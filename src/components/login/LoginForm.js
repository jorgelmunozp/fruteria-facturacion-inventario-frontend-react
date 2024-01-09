import { InputText } from '../forms/inputs/InputText';
import { InputPassword } from '../forms/inputs/InputPassword';

export const LoginForm = ({ userInput,passwordInput,alertMessage,setUserInput,setPasswordInput,setAlertMessage,handleLogin,placeholderUser,placeholderPassword,buttonTitle }) => {
  return (
    <div className='container-fluid mt-1 text-center user-select-none'>
        <div className="d-grid gap-2 col-5 mx-auto w-50 w-sm-100">
          <InputText placeholder={'Usuario'} inputText={userInput} onInputChange={(target) => setUserInput(target.target.value)} className='input form-control rounded border-muted border-1 text-muted text-center my-1 shadow-sm' />
          <InputPassword placeholder={'Contraseña'} inputText={passwordInput} onInputChange={(target) => setPasswordInput(target.target.value)} className='input form-control rounded border-muted border-1 text-muted text-center my-1 shadow-sm' />
     
          <button className='btn-login btn btn-md btn-outline-primary border border-2 my-1 py-3 rounded fw-bolder shadow-sm' onClick={ handleLogin }>
            { buttonTitle }
          </button>
          <p className='alertMessage'>{ alertMessage }</p>
        </div>
    </div>
  )
}
