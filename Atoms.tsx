import { TaskType } from "./Types";
import { ColumnType } from "./Types";
import { atom } from "jotai";

export const tasksAtom = atom<TaskType[]>([]);
export const columnsAtom = atom<ColumnType[]>([]);
