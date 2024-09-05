// atoms/userAtom.ts
import { atom } from 'jotai';

const ProjectnumberAtom = atom<{ Projectnumber: number } | null>(null);
export default ProjectnumberAtom;
