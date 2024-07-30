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
import { SubtaskFormCreate } from "./SubtaskFormCreate";

export function SubtaskCreate({ projectId, taskId, open, setOpen }) {
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create subtask</DialogTitle>
                        <DialogDescription>
                            Create your subtask here. Click save when youre
                            done.
                        </DialogDescription>
                    </DialogHeader>
                    <SubtaskFormCreate projectId={projectId} taskId={taskId} />
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Create subtask</DrawerTitle>
                    <DrawerDescription>
                        Create your subtask here. Click save when youre done.
                    </DrawerDescription>
                </DrawerHeader>
                <SubtaskFormCreate
                    projectId={projectId}
                    taskId={taskId}
                    className="px-4"
                />
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
