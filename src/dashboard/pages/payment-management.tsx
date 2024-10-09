import { useState } from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon, ChevronDown, DollarSign } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import DashboardLayout from '@/layout/default'

export default function PaymentManagement() {
    const [transactions, setTransactions] = useState([
        { id: 1, date: new Date(2023, 5, 15), description: "Pet food sale", amount: 50.00, type: 'income', category: 'Sales' },
        { id: 2, date: new Date(2023, 5, 16), description: "Veterinary supplies", amount: 200.00, type: 'expense', category: 'Supplies' },
        { id: 3, date: new Date(2023, 5, 17), description: "Grooming service", amount: 75.00, type: 'income', category: 'Services' },
        { id: 4, date: new Date(2023, 5, 18), description: "Utility bill", amount: 150.00, type: 'expense', category: 'Utilities' },
        { id: 5, date: new Date(2023, 5, 19), description: "Vaccination service", amount: 120.00, type: 'income', category: 'Services' },
    ])

    const [dateRange, setDateRange] = useState({
        from: undefined,
        to: undefined,
    })

    const [searchTerm, setSearchTerm] = useState("")
    const [typeFilter, setTypeFilter] = useState('all')

    const filteredTransactions = transactions.filter(transaction => {
        const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesType = typeFilter === 'all' || transaction.type === typeFilter
        const matchesDateRange =
            (!dateRange.from || transaction.date >= dateRange.from) &&
            (!dateRange.to || transaction.date <= dateRange.to)
        return matchesSearch && matchesType && matchesDateRange
    })

    return (
        <DashboardLayout >
            <div className="container mx-auto py-10">
                <h1 className="text-3xl font-bold mb-6">Transactions</h1>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
                    <div className="flex-1 w-full md:w-auto">
                        <Input
                            placeholder="Search transactions..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal sm:w-[300px]",
                                        !dateRange.from && !dateRange.to && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {dateRange.from ? (
                                        dateRange.to ? (
                                            <>
                                                {format(dateRange.from, "LLL dd, y")} -{" "}
                                                {format(dateRange.to, "LLL dd, y")}
                                            </>
                                        ) : (
                                            format(dateRange.from, "LLL dd, y")
                                        )
                                    ) : (
                                        <span>Pick a date range</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="end">
                                <Calendar
                                    initialFocus
                                    mode="range"
                                    selected={dateRange}
                                    onSelect={setDateRange}
                                    numberOfMonths={2}
                                />
                            </PopoverContent>
                        </Popover>
                        <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value)}>
                            <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder="Filter by type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Types</SelectItem>
                                <SelectItem value="income">Income</SelectItem>
                                <SelectItem value="expense">Expense</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredTransactions.map((transaction) => (
                            <TableRow key={transaction.id}>
                                <TableCell>{format(transaction.date, 'PP')}</TableCell>
                                <TableCell>{transaction.description}</TableCell>
                                <TableCell>{transaction.category}</TableCell>
                                <TableCell>{transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}</TableCell>
                                <TableCell className="text-right">
                                    <span className={cn(
                                        "font-medium",
                                        transaction.type === 'income' ? "text-green-600" : "text-red-600"
                                    )}>
                                        {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </DashboardLayout>
    )
}