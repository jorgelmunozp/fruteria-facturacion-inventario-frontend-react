import '../forms.css'

export const InputText = ({ placeholder,inputText,onInputChange,className }) => {
    return (
        <>
            <div className="form-floating text-center" data-mdb-input-init>
                <input value={ inputText } onChange={ (target) => onInputChange(target) } 
                    type="search" placeholder={ placeholder } id="formSearch" 
                    className={ className } autoComplete="off" />
                <label htmlFor="formSearch" className="form-label text-muted text-nowrap text-truncate" >{ placeholder }</label>
            </div>
        </>
    )
}