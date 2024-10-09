"use client"

import React, { useState } from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
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

export default function AppointmentManagement() {
  const [date, setDate] = useState()
  const [appointments, setAppointments] = useState([
    { id: 1, date: new Date(2023, 5, 15), time: "10:00 AM", name: "John Doe", email: "john@example.com" },
    { id: 2, date: new Date(2023, 5, 16), time: "2:00 PM", name: "Jane Smith", email: "jane@example.com" },
  ])
  const [newAppointment, setNewAppointment] = useState({
    date: new Date(),
    time: "",
    name: "",
    email: "",
  })

  const handleAddAppointment = () => {
    setAppointments([...appointments, { ...newAppointment, id: appointments.length + 1 }])
    setNewAppointment({ date: new Date(), time: "", name: "", email: "" })
  }

  const handleDeleteAppointment = (id) => {
    setAppointments(appointments.filter(appointment => appointment.id !== id))
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Appointment Management</h1>

      <div className="flex justify-between items-center mb-6">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>


      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell>{format(appointment.date, "PPP")}</TableCell>
              <TableCell>{appointment.time}</TableCell>
              <TableCell>{appointment.name}</TableCell>
              <TableCell>{appointment.email}</TableCell>
              <TableCell>
                <Button variant="destructive" onClick={() => handleDeleteAppointment(appointment.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}