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
import { ProjectFormEdit } from "./ProjectFormEdit";

export function ProjectEdit({project,setProjects, open, setOpen }) {
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit project </DialogTitle>
                        <DialogDescription>
                            Make changes to your project here. Click save when
                            youre done.
                        </DialogDescription>
                    </DialogHeader>
                    <ProjectFormEdit project={project} setProjects={setProjects} setOpen={setOpen}/>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Edit project</DrawerTitle>
                    <DrawerDescription>
                        Make changes to your project here. Click save when youre
                        done.
                    </DrawerDescription>
                </DrawerHeader>
                <ProjectFormEdit project={project} setProjects={setProjects} setOpen={setOpen} className="px-4" />
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
