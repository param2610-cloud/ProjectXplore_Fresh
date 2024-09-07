import { useRef } from "react";


export const UseProjectReference = ()=>{

    const ProjectDialogCloseRef = useRef<HTMLButtonElement>(null)
    return {ProjectDialogCloseRef}
}
