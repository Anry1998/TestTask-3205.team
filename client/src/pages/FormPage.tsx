import {FC, useContext, useState, useEffect} from "react";

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Card } from 'react-bootstrap';

import { useForm, SubmitHandler } from "react-hook-form"
import { Context } from "..";
import { observer } from "mobx-react-lite";

import numberDash from '../functions/replaceFn'


interface MyRequest {
    email: string;
    number?: string
}

const FormPage: FC = () => {
    const {store} = useContext(Context)

    const { register, handleSubmit, formState: { errors}} = useForm<MyRequest>({
        mode: 'onBlur',
      })
    const submit: SubmitHandler<MyRequest> = (data) => {
        store.getRes(email, number.replace(/[-]/g,"")) 
        setEmail('')
        setNumber('')
    }
    
    const [email, setEmail] = useState<string>('')
    const [number, setNumber] = useState<string>('')

    const setNumberMask = (e: any) => {
        let a = numberDash(e.target.value)
        setNumber(a)
    }
    
    return(
        <Container className="padding-top-main">
            <Card className="card-class my-card" >
                <Form  onSubmit={handleSubmit(submit)}>
                    <Form.Group className="mb-3 form-class" controlId="exampleForm.ControlInput1" style={{height: '90px'}}>
                                <Form.Label>Введите email</Form.Label>
                                <Form.Control 
                                    {...register('email', {
                                        required: 'Поле обязательно к заполнению',
                                        pattern: {
                                            value: /\S+@\S+\.\S+/,
                                            message: "Введенное значение не соответствует формату электронной почты",
                                        },
        
                                    })}
                                    className="input-control"
                                    value={email} 
                                    onChange={e => setEmail(e.target.value)} 
                                    type="text" 
                                    placeholder="email" 
                                    autoComplete="new-password"
                                /> 
                                {errors.email && <p className="red-error">{errors?.email?.message?.toString()}</p>}
                                
                    </Form.Group>
                    <Form.Group className="mb-3 form-class" controlId="exampleForm.ControlInput1" style={{height: '90px'}}>
                                <Form.Label>Введите number. Необязательное поле</Form.Label>
                                <Form.Control 
                                    {...register('number', {  
                                    })}
                                    className="input-control"
                                    value={number} 
                                    onChange={(e) => (setNumberMask(e)) } 
                                    type="text" 
                                    placeholder="number" 
                                    autoComplete="new-password"
                                /> 
                                {errors.number && <p className="red-error">{errors?.number?.message?.toString()}</p>}
                                
                    </Form.Group>
                    <div className="red-error">
                    </div>
                    <Button  type="submit" >Отправить запрос</Button> 
                </Form>
            </Card>

            {store.resErr && <p className="red-error">{store.resErr}</p>}
                                    
            { 
                store.res.map(item => 
                    <div key={item.email} className="item-list">
                        <div> {item.email !== undefined && 'Email:' + ' ' + item.email}</div>
                        <div> {item.number !== undefined && 'Nymber:' + ' ' +  item.number}</div>
                    </div>
                    )
            }
        </Container>
    )
}

export default observer(FormPage)