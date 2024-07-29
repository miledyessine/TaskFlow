/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { SprintCreate } from "@/components/SprintDialog/SprintCreate";
import { Button } from "@/components/ui/button";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    MouseSensor,
    useSensor,
    useSensors,
    DragOverlay,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Crown } from "lucide-react";
import { DroppableTable } from "@/components/SprintTable/DroppableTable";
import { Skeleton } from "@/components/ui/skeleton";
import useProject from "@/hooks/useProject";
import { BacklogCreate } from "@/components/BacklogDialog/BacklogCreate";

function Project() {
    const {
        handleDragEnd,
        handleDragOver,
        handleDragStart,
        handleOpenCreateSprintDialog,
        handleOpenCreateBacklogDialog,
        projectFetcher,
        openCreateSprint,
        setOpenCreateSprint,
        openCreateBacklog,
        setOpenCreateBacklog,
        project,
        user,
        tables,
        tasks,
        activeId,
        overTableId,
    } = useProject();

    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                delay: 250,
                distance: 10,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function renderTaskDetails(tasks, activeId) {
        const task = tasks.find((task) => task._id === activeId);
        if (!task) return null;

        return (
            <TableRow>
                <TableCell className="font-medium">{task.name}</TableCell>
                <TableCell>Assignee</TableCell>
                <TableCell>
                    {new Date(task.due_date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                    })}
                </TableCell>
                <TableCell>{task.status}</TableCell>
            </TableRow>
        );
    }

    return (
        <div className="md:m-6 m-2">
            {projectFetcher.fetchHandler.loading && (
                <div className="flex items-center justify-between">
                    <Skeleton className="h-10 w-[160px]" />
                    <Skeleton className="h-10 w-[160px]" />
                </div>
            )}
            {project && (
                <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-semibold tracking-tight ">
                        {project.name}
                        {"  "}
                        <Badge className="gap-0.5">
                            <Crown size={13} />
                            {user?.username || (
                                <Skeleton className="h-5 w-[80px]" />
                            )}
                        </Badge>
                    </h3>
                    <div className="flex items-center justify-between gap-2">
                        <Button
                            variant="outline"
                            onClick={handleOpenCreateSprintDialog}
                        >
                            Create a new sprint
                        </Button>
                        <Button
                            variant="outline"
                            onClick={handleOpenCreateBacklogDialog}
                        >
                            Create a backlog
                        </Button>
                    </div>
                </div>
            )}
            <br />
            {tables && (
                <div className="space-y-4">
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragStart={handleDragStart}
                        onDragOver={handleDragOver}
                        onDragEnd={handleDragEnd}
                    >
                        {tasks &&
                            tables &&
                            tables.map((table) => (
                                <DroppableTable
                                    key={table._id}
                                    table={table}
                                    tasks={
                                        tasks.filter(
                                            (task) =>
                                                task.sprint_id === table._id ||
                                                task.backlog_id === table._id
                                        ) || []
                                    }
                                    isOver={overTableId === table._id}
                                />
                            ))}
                        <DragOverlay>
                            {activeId ? (
                                <Table>
                                    <TableBody>
                                        {renderTaskDetails(tasks, activeId)}
                                    </TableBody>
                                </Table>
                            ) : null}
                        </DragOverlay>
                    </DndContext>
                </div>
            )}
            {openCreateSprint && (
                <SprintCreate
                    open={openCreateSprint}
                    setOpen={setOpenCreateSprint}
                />
            )}
            {openCreateBacklog && (
                <BacklogCreate
                    open={openCreateBacklog}
                    setOpen={setOpenCreateBacklog}
                />
            )}
        </div>
    );
}

export default Project;
