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
                    <CardTitle>{table.title}</CardTitle>
                    <Button variant="outline" onClick={handleOpenCreateDialog}>
                        Add Task
                    </Button>
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
                        </TableRow>
                    </TableHeader>
                    <SortableContext
                        items={tasks.map((task) => task.id)}
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
