"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"

export default function SchedulingManagement() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Scheduling Management</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Calendar</CardTitle>
                </CardHeader>
                <CardContent>
                    <Calendar mode="multiple" className="rounded-md border" />
                </CardContent>
            </Card>
        </div>
    )
}