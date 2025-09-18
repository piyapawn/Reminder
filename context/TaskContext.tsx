import { createContext, useContext, useState } from "react";

export type Task = {
    id: string;
    title: string;
    timeStamp?: Date;
}

type ToDoContextType = {
    taskList: Task[];
    doneList: Task[];
    onAddTask: (title: string) => void;
    onDoneTask: (id: string) => void;
}

const ToDoContext = createContext<ToDoContextType | undefined>(undefined);
export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
    const defaultTask = [
        {
            id: '00000DF',
            title: 'Pet a dog'
        },
        {
            id: '00001DF',
            title: 'Watch a car'
        }, {
            id: '00002DF',
            title: 'Planting'
        }
    ]
    const [taskList, setTaskList] = useState<Task[]>(defaultTask);
    const [doneList, setDoneList] = useState<Task[]>([]);

    const onAddTask = (title: string) => {
        setTaskList([...taskList, { id: Date.now().toString(), title: title }]);
    };

    const onDoneTask = (id: string) => {
        const taskToBeDone = taskList.find((task: Task) => task.id === id);
        if (!taskToBeDone) return;
        taskToBeDone.timeStamp = new Date(Date.now());

        setDoneList([...doneList, taskToBeDone]);
        setTaskList(taskList.filter((task: Task) => task.id !== id));
    };

    return (
        <ToDoContext.Provider value={{ taskList, doneList, onAddTask, onDoneTask }}>
            {children}
        </ToDoContext.Provider>
    );

};

export const useToDoContext = () => {
    const context = useContext(ToDoContext);
    if (!context) {
        throw new Error("use useToDoContext within TaskProvider");
    };
    return context;
}