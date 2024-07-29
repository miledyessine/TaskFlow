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
        id: table._id,
    });
    const isSprint = !!table.start_date;
    return (
        <Card ref={setNodeRef}>
            <CardHeader className="px-7">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-between gap-2">
                        <Link to={`/sprint/${table._id}`}>
                            <CardTitle>{table.name}</CardTitle>
                        </Link>
                        {table.start_date && (
                            <CardDescription>
                                {new Date(table.start_date).toLocaleDateString(
                                    "en-GB",
                                    { day: "2-digit", month: "short" }
                                )}{" "}
                                -{" "}
                                {new Date(table.end_date).toLocaleDateString(
                                    "en-GB",
                                    { day: "2-digit", month: "short" }
                                )}
                            </CardDescription>
                        )}

                        <CardDescription className="text-xs text-gray-400">
                            ({tasks.length} tickets)
                        </CardDescription>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                        {table.start_date && (
                            <Button variant="outline">Start Sprint</Button>
                        )}
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
                        <TableBody>
                            {tasks.length > 0 ? (
                                tasks.map((task) => (
                                    <SprintRow key={task._id} task={task} />
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
            {open && (
                <TaskCreate
                    {...(isSprint
                        ? { sprint_id: table._id }
                        : { backlog_id: table._id })}
                    open={open}
                    setOpen={setOpen}
                    idType={isSprint ? "sprint_id" : "backlog_id"}
                />
            )}
        </Card>
    );
}
