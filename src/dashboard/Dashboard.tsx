import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Users, Stethoscope, Calendar, BarChart } from "lucide-react"
import { LineChart, Line, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import DashboardLayout from '../layout/default'
export default function Dashboard() {
    return (
        <DashboardLayout>
            <div className="p-8 space-y-8">

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <StatsCard title="Total Users" value="15,234" icon={Users} change="+12%" />
                    <StatsCard title="Active Vets" value="1,420" icon={Stethoscope} change="+5%" />
                    <StatsCard title="Appointments Today" value="342" icon={Calendar} change="+18%" />
                    <StatsCard title="App Installs" value="98,245" icon={BarChart} change="+7%" />
                </div>
                <ScrollArea className="h-[70vh]" >
                    <div className="flex flex-col gap-6">

                        <div className="grid gap-6 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>User Growth</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <LineChart data={userGrowthData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="month" />
                                            <YAxis />
                                            <Tooltip />
                                            <Line type="monotone" dataKey="users" stroke="#8884d8" />
                                            <Line type="monotone" dataKey="activeUsers" stroke="#82ca9d" />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Appointment Distribution</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <RechartsBarChart data={appointmentDistributionData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="day" />
                                            <YAxis />
                                            <Tooltip />
                                            <Bar dataKey="appointments" fill="#8884d8" />
                                        </RechartsBarChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Pet Types Distribution</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <PieChart>
                                            <Pie
                                                data={petTypesData}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                label={renderCustomizedLabel}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                dataKey="value"
                                            >
                                                {petTypesData.map((_, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Top Services</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <RechartsBarChart layout="vertical" data={topServicesData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis type="number" />
                                            <YAxis dataKey="name" type="category" />
                                            <Tooltip />
                                            <Bar dataKey="value" fill="#82ca9d" />
                                        </RechartsBarChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                </ScrollArea>
            </div>
        </DashboardLayout>
    )
}

function StatsCard({ title, value, icon: Icon, change }: any) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {change && (
                    <p className={`text-xs ${change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                        {change} from last month
                    </p>
                )}
            </CardContent>
        </Card>
    )
}

const userGrowthData = [
    { month: 'Jan', users: 4000, activeUsers: 2400 },
    { month: 'Feb', users: 5000, activeUsers: 3000 },
    { month: 'Mar', users: 6000, activeUsers: 3600 },
    { month: 'Apr', users: 7000, activeUsers: 4200 },
    { month: 'May', users: 8000, activeUsers: 4800 },
    { month: 'Jun', users: 9000, activeUsers: 5400 },
]

const appointmentDistributionData = [
    { day: 'Mon', appointments: 120 },
    { day: 'Tue', appointments: 150 },
    { day: 'Wed', appointments: 180 },
    { day: 'Thu', appointments: 170 },
    { day: 'Fri', appointments: 190 },
    { day: 'Sat', appointments: 220 },
    { day: 'Sun', appointments: 100 },
]

const petTypesData = [
    { name: 'Dogs', value: 400 },
    { name: 'Cats', value: 300 },
    { name: 'Birds', value: 100 },
    { name: 'Others', value: 80 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    )
}

const topServicesData = [
    { name: 'Vaccination', value: 400 },
    { name: 'Dental Cleaning', value: 300 },
    { name: 'Spay/Neuter', value: 200 },
    { name: 'Wellness Exam', value: 280 },
    { name: 'Microchipping', value: 180 },
]