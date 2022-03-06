import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ModeForm } from 'src/constants/object'
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