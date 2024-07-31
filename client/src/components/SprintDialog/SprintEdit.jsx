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
import { SprintFormEdit } from "./SprintFormEdit";

export function SprintEdit({ sprint, setSprints, open, setOpen }) {
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit sprint </DialogTitle>
                        <DialogDescription>
                            Edit your sprint here. Click save when youre done.
                        </DialogDescription>
                    </DialogHeader>
                    <SprintFormEdit sprint={sprint} setSprints={setSprints} setOpen={setOpen}/>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Edit sprint</DrawerTitle>
                    <DrawerDescription>
                        Edit your sprint here. Click save when youre done.
                    </DrawerDescription>
                </DrawerHeader>
                <SprintFormEdit
                    className="px-4"
                    sprint={sprint}
                    setSprints={setSprints}
                    setOpen={setOpen}
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
