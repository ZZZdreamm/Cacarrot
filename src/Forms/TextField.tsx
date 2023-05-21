// import { ErrorMessage, Field } from "formik";

// import { ErrorMessage } from "formik/dist/ErrorMessage";
// import { Field } from "formik/dist/Field";

export default function TextField(props: textFieldProps){
    return(
    <div className="mb-3">
        <label className="input-field" htmlFor={props.field}>{props.displayName}</label>
        {/* <Field type={props.type} name={props.field} id={props.field} className="form-control input-field" placeholder={`Enter ${props.field}`}/>
        <ErrorMessage name={props.field}>{(msg:any) => <div className="text-danger">{msg}</div>}</ErrorMessage> */}
      </div>
    )
}

interface textFieldProps{
    field:string;
    displayName:string;
    type: 'text' | 'password';
}

TextField.defaultProps = {
    type:'text'
}