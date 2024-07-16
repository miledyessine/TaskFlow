/* eslint-disable react/prop-types */
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import SprintRow from "./SprintRow";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { TaskCreate } from "../TaskDialog/TaskCreate";
import { TicketPlus } from "lucide-react";
import { Link } from "react-router-dom";
export function DroppableTable({ table, tasks }) {
    const [open, setOpen] = useState(false);
    const handleOpenCreateDialog = async () => {
        setOpen(true);
    };
    const { setNodeRef } = useDroppable({
        id: table.id,
    });

    return (
        <Card>
            <CardHeader className="px-7">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-between gap-2">
                        <Link to={"/sprint"}>
                            <CardTitle>{table.title}</CardTitle>
                        </Link>
                        <CardDescription>20 jun - 19 jul</CardDescription>
                        <CardDescription className="text-xs text-gray-400">
                            ({tasks.length} tickets)
                        </CardDescription>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                        <Button variant="outline">Start Sprint</Button>
                        <Button
                            variant="outline"
                            onClick={handleOpenCreateDialog}
                        >
                            <TicketPlus className="h-4 w-4 mr-1" />
                            <span className="sr-only sm:not-sr-only">
                                Add Task
                            </span>
                        </Button>
                    </div>
                </div>
                <CardDescription>{table.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableCaption>
                        Planifiez un sprint en faisant glisser le pied
                        d&apos;état du sprint sous les tickets correspondant ou
                        en faisant glisser des tickets ici.
                    </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Assignee</TableHead>
                            <TableHead>Due Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <SortableContext
                        items={tasks}
                        strategy={rectSortingStrategy}
                    >
                        <TableBody ref={setNodeRef}>
                            {tasks.length > 0 ? (
                                tasks.map((task) => (
                                    <SprintRow key={task.id} task={task} />
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell>No tasks available</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </SortableContext>
                </Table>
            </CardContent>
            {open && <TaskCreate open={open} setOpen={setOpen} />}
        </Card>
    );
}
