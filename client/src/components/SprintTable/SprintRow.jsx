/* eslint-disable react/prop-types */
import { TableCell, TableRow } from "@/components/ui/table";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SprintRow({ task }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task.id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        border: isDragging ? "1px dashed #aaa" : "none",
    };

    return (
        <TableRow ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <TableCell className="font-medium">{task.name}</TableCell>
            <TableCell>{task.assignee}</TableCell>
            <TableCell>{task.dueDate}</TableCell>
            <TableCell>{task.status}</TableCell>
        </TableRow>
    );
}

export default SprintRow;
