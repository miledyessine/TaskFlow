/* eslint-disable react/prop-types */

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { TaskFormCreate } from "./TaskFormCreate";

export function TaskCreate({projectId,statusCol, sprint_id, backlog_id, open, setOpen, idType }) {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const table_id = sprint_id || backlog_id;
    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create task</DialogTitle>
                        <DialogDescription>
                            Create your task here. Click save when youre done.
                        </DialogDescription>
                    </DialogHeader>
                    <TaskFormCreate projectId={projectId} statusCol={statusCol} table_id={table_id} idType={idType}/>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Create task</DrawerTitle>
                    <DrawerDescription>
                        Create your task here. Click save when youre done.
                    </DrawerDescription>
                </DrawerHeader>
                <TaskFormCreate projectId={projectId} statusCol={statusCol} table_id={table_id} idType={idType} className="px-4" />
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
