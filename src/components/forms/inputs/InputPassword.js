export const InputPassword = ({ placeholder,inputText,onInputChange,className }) => {
    return (
        <>
            <div className="form-floating text-center" data-mdb-input-init>
                <input value={ inputText } onChange={ (target) => onInputChange(target) } 
                    type="password" placeholder={ placeholder } id="formPassword" 
                    className={ className } autoComplete="off" />
                <label htmlFor="formPassword" className="form-label text-muted text-nowrap text-truncate" >{ placeholder }</label>
            </div>
        </>
    )
}