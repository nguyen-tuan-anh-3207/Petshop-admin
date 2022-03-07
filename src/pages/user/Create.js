import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ModeForm } from 'src/constants/object'
import { CREATE_SUCCESS } from 'src/constants/string'
import { useNotification } from 'src/hook/useNotification'
import { useCreateUsersMutation } from 'src/reducers/user/api'
import Form from './Form'

const CreateUser = () => {

    const [createUsers, { isLoading, error, isSuccess }] = useCreateUsersMutation()

    const navigate = useNavigate()

    const handleSubmit = (value) => {
        createUsers(value)
    }

    useEffect(() => {
        if (isSuccess) {
            navigate('/dashboard/users')
        }
    }, [isSuccess])

    useNotification(error, isSuccess, CREATE_SUCCESS)

    return (
        <Form
            title={'Tạo người dùng'}
            submit={handleSubmit}
            mode={ModeForm.Create}
            isLoading={isLoading}
        />
    )
}

export default CreateUser