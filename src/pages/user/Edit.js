import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ModeForm } from 'src/constants/object'
import { UPDATE_SUCCESS } from 'src/constants/string'
import { useNotification } from 'src/hook/useNotification'
import { useLoadUsersQuery, useUpdateUsersMutation } from 'src/reducers/user/api'
import Form from './Form'

const EditUser = () => {

    const { id } = useParams()

    const [updateUsers, { isLoading, error, isSuccess }] = useUpdateUsersMutation()

    const { data } = useLoadUsersQuery(id)

    const navigate = useNavigate()

    const handleSubmit = (value) => {
        updateUsers({ id, ...value })
    }

    useEffect(() => {
        if (isSuccess) {
            navigate('/dashboard/users')
        }
    }, [isSuccess])

    useNotification(error, isSuccess, UPDATE_SUCCESS)

    return (
        <React.Fragment>
            {data && (
                <Form
                    title={'Cập nhật người dùng'}
                    submit={handleSubmit}
                    data={data?.user}
                    mode={ModeForm.Edit}
                    isLoading={isLoading}
                />
            )}
        </React.Fragment>
    )
}

export default EditUser