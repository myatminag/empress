import React from 'react';

import { WebTitle, SubTitle, Summary, DataChart, Waiting } from 'components';
import { useNavigate } from 'react-router-dom';
import useDashboard from './hook';

const Dashboard = () => { 

    const navigate = useNavigate();

    const{ isLoading, error, data } = useDashboard();

    if (isLoading) return <Waiting />
    
    if (error) return navigate('*')

    return (
        <section className="px-3 py-6 lg:px-6">
            <WebTitle title={"Admin Panel"} />
            <SubTitle name={"Admin Dashboard"} />
            <div className="mb-5">
                <div className="grid grid-cols-1 gap-y-3 mb-3 lg:grid-cols-3 lg:gap-x-3 lg:mb-5">
                    <Summary 
                        name={"Total Users :"}
                        data={data.users && data.users[0] ? data.users[0].totalUsers : 0}
                    />
                    <Summary 
                        name={"Total Orders :"}
                        data={data.orders && data.users[0] ? data.orders[0].totalOrders : 0}
                    />
                    <Summary 
                        name={"Total Sales :"}
                        data={data.orders && data.users[0] ? `$${data.orders[0].totalSales.toFixed(2)}` : 0}
                    />
                </div>
            </div>
            <div className="lg:grid lg:grid-cols-3 lg:gap-x-3">
                <div className="px-4 py-2 border rounded-md mb-5 lg:col-span-2">
                    <p className="font-[600] underline">
                        Daily Sales
                    </p>
                    {data?.dailyOrders.length < 0 ? (
                        <p>
                            No Sales
                        </p>
                    ) : (
                        <DataChart type={"AreaChart"} data={[
                            ['Date', 'Sales'],
                            ...data.dailyOrders.map((order) => [order._id, order.sales])
                        ]} />
                    )}
                </div>
                <div className="border rounded-md lg:h-[450px] lg:col-span-1">
                    <p className="px-4 py-2  font-[600] underline">
                        Categories
                    </p>
                    {data.itemCategories.length === 0 ? (
                        <p>
                            No Categories
                        </p>
                    ) : (
                        <DataChart type={"PieChart"} data={[
                            ['Category', 'Items'],
                            ...data.itemCategories.map((item) => [item._id, item.count])
                        ]} />
                    )}
                </div>
            </div>
        </section>
    )
}

export default Dashboard;