import React, { HTMLProps, useEffect, useRef } from 'react';
import { FieldHookConfig, useField } from 'formik';

type Props = {
    label?: string;
    placeholder?: string;
    leadingIcon?: React.ReactNode;
    trailingIcon?: React.ReactNode;
    autoCompleted?: boolean;
    formik?: boolean;
    wrapperClassName?: string;
    containerClassName?: string;
} & HTMLProps<HTMLInputElement> &
    FieldHookConfig<string>;

export default function Input({ formik = true, ...props }: Props) {
    return formik ? InputWithFormik(props) : InputWithoutFormik(props);
}

function InputWithFormik({
    label,
    leadingIcon,
    trailingIcon,
    autoCompleted,
    wrapperClassName,
    containerClassName,
    ...props
}: Props) {
    const [field, meta] = useField(props);
    const input = useRef<HTMLInputElement>(null);
    const leadingIconRef = useRef<HTMLDivElement>(null);
    const trailingIconRef = useRef<HTMLDivElement>(null);

    const handleVisibility = () => {
        input.current?.getAttribute('type') === 'password'
            ? input.current?.setAttribute('type', 'text')
            : input.current?.setAttribute('type', 'password');
    };

    useEffect(() => {
        if (props.type === 'password') trailingIconRef.current?.classList.add('cp');
    }, [props.type]);

    return (
        <div className={`input-wrapper ${wrapperClassName ? `${wrapperClassName}` : 'my-3'}`}>
            {label && <label>{label}</label>}
            <div className={`input-container ${containerClassName ? ` ${containerClassName}` : ''}`}>
                {leadingIcon && (
                    <div className='input-icon' ref={leadingIconRef}>
                        {leadingIcon}
                    </div>
                )}
                <input {...field} {...props} ref={input} autoComplete={autoCompleted ? 'new-password' : ''} />
                {trailingIcon && (
                    <div
                        className='input-icon'
                        onClick={() => (props.type === 'password' ? handleVisibility() : null)}
                        ref={trailingIconRef}
                    >
                        {trailingIcon}
                    </div>
                )}
            </div>
            <div>
                {meta.touched && meta.error && (
                    <span className='input-feedback d-flex align-items-center text-error'>
                        <i className='uil uil-exclamation-triangle me-1 fs-6' />
                        {meta.error}
                    </span>
                )}
            </div>
        </div>
    );
}

function InputWithoutFormik({
    label,
    leadingIcon,
    trailingIcon,
    autoCompleted,
    wrapperClassName,
    containerClassName,
    ...props
}: Props) {
    const input = useRef<HTMLInputElement>(null);
    const leadingIconRef = useRef<HTMLDivElement>(null);
    const trailingIconRef = useRef<HTMLDivElement>(null);

    const handleVisibility = () => {
        input.current?.getAttribute('type') === 'password'
            ? input.current?.setAttribute('type', 'text')
            : input.current?.setAttribute('type', 'password');
    };

    useEffect(() => {
        if (props.type === 'password') trailingIconRef.current?.classList.add('cp');
    }, [props.type]);

    if (leadingIcon) {
        if (props.style) props.style.marginLeft = 24 + 6;
        else props.style = { marginLeft: 24 + 6 };
    }

    return (
        <div className={`input-wrapper ${wrapperClassName ? `${wrapperClassName}` : 'my-3'}`}>
            {label && <label>{label}</label>}
            <div className={`input-container${containerClassName ? ` ${containerClassName}` : ''}`}>
                {leadingIcon && (
                    <div className='input-leading-icon' ref={leadingIconRef}>
                        {leadingIcon}
                    </div>
                )}
                <input {...props} ref={input} autoComplete={autoCompleted ? 'new-password' : ''} />
                {trailingIcon && (
                    <div
                        className='input-icon'
                        onClick={() => (props.type === 'password' ? handleVisibility() : null)}
                        ref={trailingIconRef}
                    >
                        {trailingIcon}
                    </div>
                )}
            </div>
        </div>
    );
}
