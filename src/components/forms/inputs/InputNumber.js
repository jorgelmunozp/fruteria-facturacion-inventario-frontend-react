import { NumericFormat } from 'react-number-format';
import '../forms.css';

export const InputNumber = ({ value,name,onInputChange,placeholder,className }) => { 
    return (
        <>
            <div className="form-floating text-center" data-mdb-input-init>
                <NumericFormat value={ value } name={ name } placeholder={ placeholder } type='search' 
                    onValueChange={ (values)=> onInputChange(values) } id='inputNumber'
                    prefix={ '$ ' } thousandSeparator={ true } autoComplete='off'
                    className={className + ' pt-4'} />         
                <label htmlFor="inputNumber" className="form-label text-muted text-nowrap text-truncate" >{ placeholder} </label>
            </div>
        </>
    )
}
