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
import { SubtaskFormEdit } from "./SubtaskFormEdit";

export function SubtaskEdit({ projectId,subtask, assignee,open, setOpen }) {
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit subtask</DialogTitle>
                        <DialogDescription>
                            Edit your subtask here. Click save when youre done.
                        </DialogDescription>
                    </DialogHeader>
                    {console.log(assignee)}
                    <SubtaskFormEdit projectId={projectId}  subtask={subtask} assignee={assignee}/>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Edit subtask</DrawerTitle>
                    <DrawerDescription>
                        Edit your sybtask here. Click save when youre done.
                    </DrawerDescription>
                </DrawerHeader>
                <SubtaskFormEdit className="px-4" projectId={projectId}  subtask={subtask} assignee={assignee}/>
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
