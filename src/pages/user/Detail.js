import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Divider, Grid, Tab, Tabs, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { RoleEnum } from 'src/constants/object'
import { useLoadUsersQuery } from 'src/reducers/user/api'
import account from 'src/_mocks_/account'
import OrderCustomer from './OrderCustomer'

const Detail = () => {

    const { id } = useParams()

    const { data } = useLoadUsersQuery(id)

    const { user } = data ?? {}

    const [tab, setTab] = useState(0)

    return (
        <Grid container spacing={2}>
            <Grid item xs={2}>
                {user?.image?.url ? <img src={user?.image?.url} alt='profile_picture' style={{ width: '250px', height: '250px', objectFit: 'cover' }} /> :
                    <img src={account.photoURL} alt='profile_picture' style={{ width: '250px', height: '250px', objectFit: 'cover' }} />
                }

            </Grid>

            <Grid item xs={10}>
                <Typography variant='h4' component='div' style={{ lineHeight: 1, marginBottom: '1rem' }}>{user?.username}</Typography>
                <Typography gutterBottom variant="5" component="span" >
                    {user?.role === 1 ? RoleEnum.Admin : RoleEnum.Customer}
                </Typography>

                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={tab}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={(e, value) => setTab(value)} aria-label="lab API tabs example">
                                <Tab label="Thông tin cá nhân" value={0} />
                                <Tab label="Đơn hàng" value={1} />
                            </TabList>
                        </Box>
                        <TabPanel value={0}>
                            <Typography gutterBottom variant="5" component="p" >
                                Họ và tên: {' '}
                                <Typography gutterBottom variant="5" component="span" style={{ fontWeight: 'bold' }}>
                                    {user?.fullName}
                                </Typography>
                            </Typography>

                            <Typography gutterBottom variant="5" component="p" style={{ marginTop: '1.2rem' }}>
                                Tên đăng nhập: {' '}
                                <Typography gutterBottom variant="5" component="span" style={{ fontWeight: 'bold' }}>
                                    {user?.username}
                                </Typography>
                            </Typography>

                            <Typography gutterBottom variant="5" component="p" style={{ marginTop: '1.2rem' }}>
                                Email: {' '}
                                <Typography gutterBottom variant="5" component="span" style={{ fontWeight: 'bold' }}>
                                    {user?.email}
                                </Typography>
                            </Typography>

                            <Typography gutterBottom variant="5" component="p" style={{ marginTop: '1.2rem' }}>
                                Số điện thoại: {' '}
                                <Typography gutterBottom variant="5" component="span" style={{ fontWeight: 'bold' }}>
                                    {user?.phoneNumber}
                                </Typography>
                            </Typography>

                            <Typography gutterBottom variant="5" component="p" style={{ marginTop: '1.2rem' }}>
                                Địa chỉ: {' '}
                                <Typography gutterBottom variant="5" component="span" style={{ fontWeight: 'bold' }}>
                                    {user?.address}
                                </Typography>
                            </Typography>
                        </TabPanel>
                        <TabPanel value={1}>
                            <OrderCustomer id={id} />
                        </TabPanel>
                    </TabContext>
                </Box>

            </Grid>
        </Grid>
    )
}

export default Detail