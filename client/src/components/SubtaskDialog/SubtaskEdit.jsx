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
import { SubtaskForm } from "./SubtaskForm";

export function SubtaskEdit({ open, setOpen }) {
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
                    <SubtaskForm />
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerContent >
                <DrawerHeader className="text-left">
                    <DrawerTitle>Edit subtask</DrawerTitle>
                    <DrawerDescription>
                        Edit your sybtask here. Click save when youre done.
                    </DrawerDescription>
                </DrawerHeader>
                <SubtaskForm className="px-4" />
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
